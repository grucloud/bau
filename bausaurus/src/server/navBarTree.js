import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";
import fs from "fs/promises";
import Path from "path";
import matter from "gray-matter";
import { ExcludeFiles } from "./utils.js";

const { pipe, tap, map, get, switchCase, all, assign, tryCatch, eq, or } =
  rubico;
const { callProp, find, isEmpty, unless, filterOut, isIn } = rubicox;

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
          map((treeItem) =>
            pipe([
              () => dirents,
              find(eq(get("name"), treeItem.data.name)),
              tap((params) => {
                assert(true);
              }),
              // TODO display an error if the name if the navbar.json does not match a file
              unless(isEmpty, (dirent) => ({ dirent, treeItem })),
            ])()
          ),
          filterOut(isEmpty),
        ])(),
      // No navbarData
      pipe([get("dirents"), map((dirent) => ({ dirent }))]),
    ]),
    tap((params) => {
      assert(true);
    }),
  ])();

const isIndexFile = pipe([get("index")]);

const processDir =
  ({ directory, tree, baseDoc, pathsNested }) =>
  ({ dirent: { name }, treeItem }) =>
    pipe([
      () => Path.resolve(directory, name),
      walkTree({
        baseDoc,
        tree: { children: [], data: { name }, ...treeItem },
        pathsNested: [...pathsNested, name],
      }),
      unless(pipe([get("children"), isEmpty]), (subTree) =>
        pipe([
          () => subTree.children,
          find(isIndexFile),
          switchCase([
            isEmpty,
            () => subTree,
            pipe([
              tap((params) => {
                assert(true);
              }),
              ({ data }) => ((subTree.data.href = data.href), subTree),
              tap((params) => {
                assert(true);
              }),
              () => subTree,
            ]),
          ]),
          tap((params) => {
            assert(true);
          }),
          assign({ children: pipe([get("children"), filterOut(isIndexFile)]) }),
          tap((params) => {
            assert(true);
          }),
        ])()
      ),
      tap((params) => {
        assert(true);
      }),
      tap((subTree) => tree.children.push(subTree)),
      () => tree,
    ])();

const processFile =
  ({ directory, tree, baseDoc, pathsNested }) =>
  ({ dirent, treeItem }) =>
    pipe([
      () => dirent,
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
              ({ fileName }) => Path.join(baseDoc, ...pathsNested, fileName),
            ]),
          }),
          tap((data) => tree.children.push({ ...treeItem, data })),
        ]),
        // Not a markdown
        () => undefined,
      ]),
    ])();

const walkTree =
  ({ baseDoc, tree = { children: [] }, pathsNested = [] }) =>
  (directory) =>
    pipe([
      tap(() => {
        assert(baseDoc);
        assert(tree);
        assert(directory);
      }),
      () => directory,
      getDirEntries,
      filterOut(pipe([get("dirent.name"), isIn(ExcludeFiles)])),
      map.series(
        pipe([
          switchCase([
            pipe([get("dirent"), callProp("isDirectory")]),
            processDir({ directory, tree, baseDoc, pathsNested }),
            processFile({ directory, tree, baseDoc, pathsNested }),
          ]),
        ])
      ),
      tap((params) => {
        assert(true);
      }),
      () => tree,
    ])();

export const buildNavBarTree = ({ baseDoc, rootDir, srcDir }) =>
  pipe([
    tap(() => {
      assert(rootDir);
      assert(srcDir);
      assert(baseDoc);
    }),
    () => Path.resolve(rootDir, srcDir),
    walkTree({ baseDoc }),
    tap((tree) => {
      assert(true);
    }),
  ])();

export const writeNavBarTree = ({ navBarTree }) =>
  pipe([
    tap(() => {
      assert(navBarTree);
    }),
    () => `export const navBarTree = ${JSON.stringify(navBarTree)}`,
  ])();
