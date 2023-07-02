import assert from "assert";
import rubico from "rubico";
import { build } from "vite";

const { pipe, tap, get } = rubico;

import { createBausaurusConfig } from "./bausaurusConfig.js";
import createViteConfig from "./vite.config.js";
import { renderPages } from "./renderPage.js";
import { writePagesHashMap } from "./pagesHashMap.js";

import { createOutputDir } from "./utils.js";

const buildProd = ({ rootDir }) =>
  pipe([
    () => ({ rootDir }),
    createBausaurusConfig,
    createOutputDir,
    (bausaurusConfig) =>
      pipe([
        () => bausaurusConfig,
        createViteConfig,
        build,
        get("output"),
        renderPages(bausaurusConfig),
        tap(() => {
          writePagesHashMap(bausaurusConfig);
        }),
      ])(),
  ])();

//TODO remove
buildProd({ rootDir: process.cwd() });
