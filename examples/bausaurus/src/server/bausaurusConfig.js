import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";
import path from "path";

const { pipe, tap } = rubico;
const { callProp, defaultsDeep } = rubicox;

export const createBausaurusConfig = ({ rootDir }) =>
  pipe([
    tap((params) => {
      assert(rootDir);
    }),
    () => import(path.resolve(rootDir, "bausaurus.config.js")),
    callProp("default", { rootDir }),
    defaultsDeep({ rootDir, pageToHashMap: new Map() }),
  ])();
