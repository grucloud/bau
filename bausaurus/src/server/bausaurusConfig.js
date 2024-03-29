import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";
import path from "path";

const { pipe, tap, assign, get, set } = rubico;
const { callProp, defaultsDeep } = rubicox;

import { buildNavBarTree } from "./navBarTree.js";

export const createBausaurusConfig = ({ rootDir }) =>
  pipe([
    tap((params) => {
      assert(rootDir);
    }),
    () => import(path.resolve(rootDir, "bausaurus.config.js")),
    callProp("default", { rootDir }),
    defaultsDeep({
      rootDir,
      pageToHashMap: new Map(),
      viteConfig: { base: "/" },
    }),
    set(
      "site.base",
      ({ viteConfig, site }) => `${viteConfig.base}${site.baseDoc}`
    ),
    assign({ navBarTree: pipe([get("site"), buildNavBarTree]) }),
    tap((params) => {
      assert(true);
    }),
  ])();
