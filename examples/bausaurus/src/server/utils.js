import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";
import fs from "fs/promises";
import Path from "path";

const { pipe, tap, get, eq, flatMap, switchCase, filter, or, and, reduce } =
  rubico;
const { callProp } = rubicox;

export const isPageChunk = and([
  eq(get("type"), "chunk"),
  get("isEntry"),
  pipe([get("facadeModuleId", ""), callProp("endsWith", ".md")]),
]);

export const findMarkdownInputs =
  () =>
  ({ site: { rootDir, srcDir } }) =>
    pipe([
      tap((params) => {
        assert(rootDir);
        assert(srcDir);
      }),
      () => Path.resolve(rootDir, srcDir),
      walkDirectory({
        onFile: pipe([
          ({ dirent }) => Path.resolve(dirent.path, dirent.name),
          (path) =>
            pipe([
              () => path,
              callProp("replace", `${Path.resolve(rootDir, srcDir)}/`, ""),
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
