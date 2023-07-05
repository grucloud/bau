import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";
import fs from "fs/promises";
import Path from "path";
import matter from "gray-matter";

const { pipe, tap, map, get, switchCase, all, assign, filter, tryCatch, eq } =
  rubico;
const { callProp, find, isEmpty, unless, filterOut } = rubicox;

const isMarkdownFile = callProp("endsWith", ".md");

// If a navbav.json is present, use it to filter and order the markown files.

const readNavBarJson = pipe([
  (directory) => Path.resolve(directory, "navbar.json"),
  tryCatch(
    pipe([(path) => fs.readFile(path, "utf-8"), JSON.parse]),
    () => undefined
  ),
]);

const getDirEntries = (directory) =>
  pipe([
    () => directory,
    all({
      navbarData: pipe([readNavBarJson]),
      dirents: pipe([() => fs.readdir(directory, { withFileTypes: true })]),
    }),
    switchCase([
      get("navbarData"),
      ({ navbarData, dirents }) =>
        pipe([
          () => navbarData,
          get("children"),
          map((child) => pipe([() => dirents, find(eq(get("name"), child))])()),
        ])(),
      // No navbarData
      get("dirents"),
    ]),
    tap((params) => {
      assert(true);
    }),
  ])();

const isIndexFile = pipe([get("href", ""), callProp("endsWith", "index")]);

const processDir =
  ({ directory, tree, base, pathsNested }) =>
  ({ name }) =>
    pipe([
      () => Path.resolve(directory, name),
      walkTree({
        base,
        tree: { children: [], name },
        pathsNested: [...pathsNested, name],
      }),
      unless(pipe([get("children"), isEmpty]), (child) =>
        pipe([
          () => child.children,
          find(isIndexFile),
          switchCase([
            isEmpty,
            () => child,
            (item) => Object.assign(child, item),
          ]),
          assign({ children: pipe([get("children"), filterOut(isIndexFile)]) }),
        ])()
      ),
      tap((child) => tree.children.push(child)),
    ])();

const processFile = ({ directory, tree, base, pathsNested }) =>
  pipe([
    switchCase([
      pipe([get("name"), isMarkdownFile]),
      pipe([
        all({
          frontmatter: pipe([
            ({ name }) => Path.resolve(directory, name),
            (path) => fs.readFile(path, "utf-8"),
            matter,
            get("data"),
          ]),
          fileName: pipe([get("name"), callProp("replace", ".md", "")]),
        }),
        all({
          name: ({ frontmatter, fileName }) => frontmatter.title ?? fileName,
          href: pipe([
            ({ fileName }) => Path.join(base, ...pathsNested, fileName),
          ]),
        }),
        tap((child) => tree.children.push(child)),
      ]),
      // Not a markdown
      () => undefined,
    ]),
  ]);

const walkTree =
  ({ base, tree = { children: [] }, pathsNested = [] }) =>
  (directory) =>
    pipe([
      tap(() => {
        assert(base);
        assert(tree);
        assert(directory);
      }),
      () => directory,
      getDirEntries,
      map.series(
        pipe([
          switchCase([
            callProp("isDirectory"),
            processDir({ directory, tree, base, pathsNested }),
            processFile({ directory, tree, base, pathsNested }),
          ]),
        ])
      ),
      tap((params) => {
        assert(true);
      }),
      () => tree,
    ])();

export const buildNavBarTree = ({ base, rootDir, srcDir }) =>
  pipe([
    tap(() => {
      assert(rootDir);
      assert(srcDir);
      assert(base);
    }),
    () => Path.resolve(rootDir, srcDir),
    walkTree({ base }),
    tap((tree) => {
      assert(true);
    }),
  ])();

export const writeNavBarTree = ({ site: { rootDir, outDir }, navBarTree }) =>
  pipe([
    tap(() => {
      assert(rootDir);
      assert(outDir);
      assert(navBarTree);
    }),
    () => navBarTree,
    JSON.stringify,
    (navBarTreeString) =>
      fs.writeFile(
        Path.resolve(rootDir, outDir, "navBarTree.json"),
        navBarTreeString
      ),
  ])();
