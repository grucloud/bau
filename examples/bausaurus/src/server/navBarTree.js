import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";
import fs from "fs/promises";
import Path from "path";

const { pipe, tap, map, flatMap, switchCase, filter, or } = rubico;
const { callProp } = rubicox;

const walkTree =
  ({ tree = { children: [] }, pathsNested = [] }) =>
  (directory) =>
    pipe([
      tap(() => {
        assert(tree);
        assert(directory);
        assert(pathsNested);
      }),
      () => fs.readdir(directory, { withFileTypes: true }),
      map(
        pipe([
          switchCase([
            callProp("isDirectory"),
            ({ name }) =>
              pipe([
                () => Path.resolve(directory, name),
                walkTree({
                  tree: { children: [], name },
                  pathsNested: [...pathsNested, name],
                }),
              ])(),
            pipe([
              (dirent) => ({ name: [...pathsNested, dirent.name].join("/") }),
            ]),
          ]),
          (child) => tree.children.push(child),
        ])
      ),
      () => tree,
    ])();

export const buildNavBarTree = ({ rootDir, srcDir }) =>
  pipe([
    tap(() => {
      assert(rootDir);
      assert(srcDir);
    }),
    () => Path.resolve(rootDir, srcDir),
    walkTree({}),
    tap((tree) => {
      assert(true);
    }),
  ])();
