import assert from "assert";
import rubico from "rubico";
import path from "path";
import fs from "fs/promises";
import jsdom from "jsdom";
import matter from "gray-matter";

import Bau from "@grucloud/bau/bau.js";
import BauCss from "@grucloud/bau-css/bau-css.js";
import { md2Toc } from "./md2Toc.js";
import { md2Html } from "./md2Html.js";

const { pipe, tap, map, assign } = rubico;

export const buildBodyHtml = ({ body, contentHtml, toc }) => {
  const { JSDOM } = jsdom;
  // See https://github.com/jsdom/jsdom/issues/2230
  const virtualConsole = new jsdom.VirtualConsole();
  virtualConsole.on("error", (error) => {
    console.log(error);
  });
  const dom = new JSDOM(``, { virtualConsole });

  const bau = Bau({ document: dom.window.document });
  const bauCss = BauCss({
    document: dom.window.document,
  });
  const context = { bau, ...bauCss, tr: (x) => x };
  const Body = body(context);
  const content = Body({ contentHtml, toc }).outerHTML;
  return {
    head: dom.window.document.head.innerHTML,
    body: content,
  };
};
//TODO remove
export const buildHtml = ({ body, contentHtml, toc }) => {
  const { JSDOM } = jsdom;
  // See https://github.com/jsdom/jsdom/issues/2230
  const virtualConsole = new jsdom.VirtualConsole();
  virtualConsole.on("error", (error) => {
    console.log(error);
  });
  const dom = new JSDOM(``, { virtualConsole });

  const bau = Bau({ document: dom.window.document });
  const bauCss = BauCss({
    document: dom.window.document,
  });
  const context = { bau, ...bauCss, tr: (x) => x };
  const Body = body(context);

  const result = bau.tags.html(
    dom.window.document.head,
    Body({ contentHtml, toc })
  );
  return `<!DOCTYPE html>${result.outerHTML}`;
};

export const processMarkdownContent = ({ id, code }) =>
  pipe([
    tap((params) => {
      assert(true);
    }),
    () => code,
    matter,
    ({ content, data }) => ({
      filename: id,
      contentMd: content,
      data,
    }),
    assign({
      contentHtml: md2Html,
      toc: md2Toc,
    }),
  ])();

export const onFile =
  ({}) =>
  ({ dirent, pathsNested }) =>
    pipe([
      () => path.resolve(dirent.path, dirent.name),
      (file) => fs.readFile(file, "utf-8"),
      processMarkdownContent,
      tap((params) => {
        assert(true);
      }),
    ])();

export const writeFiles = ({ outputDir, body }) =>
  pipe([
    map(({ dirent, contentHtml, toc, pathsNested }) =>
      pipe([
        () =>
          fs.mkdir(path.resolve(outputDir, ...pathsNested), {
            recursive: true,
          }),
        () => path.parse(dirent.name).name,
        (name) => path.resolve(outputDir, ...pathsNested, `${name}.html`),
        (pathResolved) =>
          fs.writeFile(pathResolved, buildHtml({ contentHtml, toc, body })),
      ])()
    ),
  ]);
