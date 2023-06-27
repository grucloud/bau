import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";

import path from "path";
const { pipe, tap, get, flatMap, switchCase, filter, or } = rubico;

const { callProp } = rubicox;
import { readdir } from "fs/promises";

export const walkDirectory =
  ({ includePattern = ".md", onFile, pathsNested = [] }) =>
  (directory) =>
    pipe([
      () => path.resolve(directory),
      (thePath) => readdir(thePath, { withFileTypes: true }),
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
                () => path.resolve(directory, name),
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
