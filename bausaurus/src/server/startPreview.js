import assert from "assert";
import rubico from "rubico";
import { preview } from "vite";

const { pipe, tap, get } = rubico;

import { createBausaurusConfig } from "./bausaurusConfig.js";
import createViteConfig from "./vite.config.js";

export const startPreview = ({ rootDir }) =>
  pipe([
    () => ({ rootDir }),
    createBausaurusConfig,
    createViteConfig,
    preview,
  ])();
