import assert from "assert";
import fs from "fs-extra";
import Path from "path";
import os from "os";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";
import { createHash } from "crypto";

const { pipe, get, tap, map } = rubico;
const { callProp } = rubicox;

export const extractCSS = pipe([
  tap(({ document }) => {
    assert(document);
  }),
  ({ document }) => [...document.getElementsByTagName("style")],
  map(pipe([get("innerHTML")])),
  callProp("join", os.EOL),
]);

export const inferCssFileName = pipe([
  tap(({ cssContent }) => {
    assert(cssContent);
  }),
  ({ cssContent }) =>
    createHash("sha256").update(cssContent).digest("hex").substring(0, 10),
  (hash) => `bau-css.${hash}.css`,
]);

export const writeExtractedCss = ({ site, cssContent, cssFilename }) =>
  pipe([
    tap(() => {
      assert(cssContent);
      assert(site.rootDir);
      assert(site.outDir);
    }),
    //TODO
    () => Path.resolve(site.rootDir, "dist", "assets", cssFilename),
    tap((path) => {
      assert(path);
    }),
    (path) => fs.writeFile(path, cssContent),
  ])();
