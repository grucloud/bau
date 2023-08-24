import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";
import fs from "fs/promises";
import Path from "path";

// TODO should read from .gitignore
export const ExcludeFiles = [
  "node_modules",
  ".git",
  ".DS_Store",
  "coverage",
  "dist",
  "build",
  "public",
  ".vscode",
];

const { pipe, tap, get, eq, flatMap, switchCase, filter, or, and, reduce } =
  rubico;
const { callProp, filterOut, isIn, unless } = rubicox;

export const isMarkdownPageChunk = and([
  eq(get("type"), "chunk"),
  get("isEntry"),
  pipe([get("facadeModuleId", ""), callProp("endsWith", ".md")]),
]);

const removeFirstSlash = callProp("slice", 1);

export const findMarkdownInputs =
  () =>
  ({ site: { rootDir, srcDir, base } }) =>
    pipe([
      tap((params) => {
        assert(rootDir);
        assert(srcDir);
        assert(base);
      }),
      () => Path.resolve(rootDir, srcDir),
      walkDirectory({
        onFile: pipe([
          ({ dirent }) => Path.resolve(dirent.path, dirent.name),
          (path) =>
            pipe([
              () => path,
              callProp(
                "replace",
                `${Path.resolve(rootDir, srcDir)}/`,
                removeFirstSlash(base)
              ),
              (key) => ({ key, path }),
            ])(),
        ]),
      }),
      reduce((acc, { key, path }) => ({ ...acc, [key]: path }), {}),
      tap((params) => {
        assert(true);
      }),
    ])();

export const walkDirectory =
  ({ includePattern = ".md", onFile, pathsNested = [] }) =>
  (directory) =>
    pipe([
      () => Path.resolve(directory),
      (thePath) => fs.readdir(thePath, { withFileTypes: true }),
      filterOut(pipe([get("name"), isIn(ExcludeFiles)])),
      filter(
        or([
          callProp("isDirectory"),
          pipe([get("name"), callProp("endsWith", includePattern)]),
        ])
      ),
      flatMap(
        pipe([
          switchCase([
            callProp("isDirectory"),
            ({ name }) =>
              pipe([
                () => Path.resolve(directory, name),
                walkDirectory({
                  includePattern,
                  onFile,
                  pathsNested: [...pathsNested, name],
                }),
              ])(),
            pipe([
              (dirent) => ({ dirent, pathsNested }),
              onFile,
              (result) => [result],
            ]),
          ]),
        ])
      ),
    ])();

export const createOutputDir = tap(
  pipe([
    get("site"),
    tap(({ rootDir, outDir }) => {
      assert(rootDir);
      assert(outDir);
    }),
    ({ rootDir, outDir }) => Path.join(rootDir, outDir),
    (path) => fs.mkdir(path, { recursive: true }),
  ])
);
export const filenameToHref = (site) =>
  pipe([
    tap((filename) => {
      assert(filename);
      assert(site.rootDir);
      assert(site.srcDir);
    }),
    unless(
      callProp("startsWith", site.base), // Dev mode
      pipe([
        callProp("replace", Path.resolve(site.rootDir, site.srcDir), ""),
        (name) => Path.join(site.baseDoc, name),
      ])
    ),
    callProp("replace", ".md", ""),
    tap((filename) => {
      assert(true);
    }),
  ]);
