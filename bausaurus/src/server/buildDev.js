import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";
import { createServer } from "vite";

const { pipe, tap } = rubico;
const { callProp } = rubicox;

import { createBausaurusConfig } from "./bausaurusConfig.js";
import createViteConfig from "./vite.config.js";

export const buildDev = ({ rootDir }) =>
  pipe([
    tap((params) => {
      assert(true);
    }),
    () => ({ rootDir }),
    createBausaurusConfig,
    createViteConfig,
    createServer,
    callProp("listen"),
  ])();
