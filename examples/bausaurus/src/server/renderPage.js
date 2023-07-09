import assert from "assert";
import fs from "fs-extra";
import Path from "path";
import os from "os";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";
import { createHash } from "crypto";

const { pipe, eq, get, tap, filter, and, all, map, assign } = rubico;
const { callProp, find, when } = rubicox;

import { processMarkdownContent } from "./markdown.js";
import createContext from "./context.js";
import createJSDOM from "./jsdom.js";
import { navBarTreeToBreadcrumbs } from "./breadcrumbs.js";
import { navBarTreeToPaginationNav } from "./paginationNav.js";

import { isPageChunk } from "./utils.js";

export const isOutputJs = and([
  eq(get("type"), "chunk"),
  get("isEntry"),
  pipe([get("facadeModuleId", ""), callProp("endsWith", ".js")]),
]);

export const renderPages = (config) => (output) =>
  pipe([
    tap((params) => {
      assert(config);
      assert(output);
    }),
    () => output,
    all({
      //
      config: () => config,
      output: () => output,
      appChunk: find(isOutputJs),
      //TODO
      //cssChunk: find(isOutputCss),
    }),
    (renderParam) =>
      pipe([
        () => output,
        filter(isPageChunk),
        map(pipe([renderPage(renderParam)])),
      ])(),
    tap((params) => {
      assert(true);
    }),
  ])();

const extractCSS = pipe([
  tap(({ document }) => {
    assert(document);
  }),
  ({ document }) => [...document.getElementsByTagName("style")],
  map(pipe([get("innerHTML")])),
  callProp("join", os.EOL),
]);

const inferCssFileName = pipe([
  tap(({ cssContent }) => {
    assert(cssContent);
  }),
  ({ cssContent }) =>
    createHash("sha256").update(cssContent).digest("hex").substring(0, 10),
  (hash) => `bau-css.${hash}.css`,
]);

const writeExtractedCss = ({ site, cssContent, cssFilename }) =>
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

const renderDocApp = async ({
  dom,
  context,
  docApp,
  navBarTree,
  breadcrumbs,
  contentHtml,
  toc,
  paginationNav,
}) => {
  assert(dom);
  assert(docApp);
  assert(navBarTree);
  assert(contentHtml);
  assert(toc);
  assert(breadcrumbs);
  assert(paginationNav);

  const DocApp = await docApp(context);
  // This will fill the dom.window.document.head with the style
  const content = await DocApp({
    navBarTree,
    contentHtml,
    toc,
    breadcrumbs,
    paginationNav,
  }).outerHTML;
  const cssContent = extractCSS({ document: dom.window.document });
  const cssFilename = inferCssFileName({ cssContent });
  return {
    body: content,
    cssContent,
    cssFilename,
  };
};
const toHtml = ({
  siteData,
  title,
  description,
  content,
  appChunk,
  cssChunk,
  metadataScript,
}) => `
<!DOCTYPE html>
<html lang="${siteData.lang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${title}</title>
    <meta name="description" content="${description}">
    ${siteData.favicon ? `<link rel="icon" href="${siteData.favicon}">` : ""}
    <link rel="stylesheet" href="/assets/${content.cssFilename}">
    ${
      cssChunk
        ? `<link rel="preload stylesheet" href="/${cssChunk.fileName}" as="style">`
        : ""
    }
    ${
      appChunk
        ? `<script type="module" src="/${appChunk.fileName}"></script>`
        : ``
    }
  </head>
  <body>
    <div id="app">${content.body}</div>
    <script>${metadataScript}</script>
  </body>
</html>`;

const assignFrontMatterData = ({ frontmatter }) =>
  pipe([
    when(() => frontmatter.title, assign({ title: () => frontmatter.title })),
    when(
      () => frontmatter.description,
      assign({ description: () => frontmatter.description })
    ),
  ]);

export const renderPage =
  ({ config, output, appChunk, cssChunk, assets }) =>
  async (chunk) => {
    assert(config);
    assert(output);
    assert(chunk);
    assert(chunk.facadeModuleId);
    const { site } = config;
    assert(site);
    assert(site.srcDir);
    assert(site.outDir);
    assert(site.base);

    const dom = createJSDOM();
    const context = createContext({
      window: dom.window,
    });
    const pageMd = chunk.name.replace(site.base.slice(1), "");
    const page = pageMd.replace(".md", "");
    assert(page);
    const siteData = config.site;
    // Use use data from frontmatter
    const title = siteData.title;
    const description = siteData.description;
    let metadataScript = "";

    return pipe([
      () => fs.readFile(chunk.facadeModuleId, "utf-8"),
      (code) => ({
        filename: chunk.facadeModuleId,
        code,
      }),
      processMarkdownContent({ dom, context }),
      ({ contentHtml, toc, frontmatter }) =>
        pipe([
          () => ({
            dom,
            context,
            docApp: config.docApp,
            navBarTree: config.navBarTree,
            contentHtml,
            toc,
            breadcrumbs: navBarTreeToBreadcrumbs({
              navBarTree: config.navBarTree,
              site: config.site,
              filename: chunk.facadeModuleId,
            }),
            paginationNav: navBarTreeToPaginationNav({
              navBarTree: config.navBarTree,
              site: config.site,
              filename: chunk.facadeModuleId,
            }),
          }),
          renderDocApp,
          (content) =>
            pipe([
              () => ({
                siteData,
                title,
                description,
                content,
                cssChunk,
                appChunk,
                metadataScript,
              }),
              assignFrontMatterData({ frontmatter }),
              toHtml,
              callProp("trim"),
              (html) =>
                pipe([
                  () =>
                    Path.join(
                      config.rootDir,
                      config.site.outDir,
                      `${page}.html`
                    ),
                  tap((htmlFileName) =>
                    fs.ensureDir(Path.dirname(htmlFileName))
                  ),
                  tap((htmlFileName) => fs.writeFile(htmlFileName, html)),
                ])(),
              tap(() =>
                writeExtractedCss({
                  site: config.site,
                  cssContent: content.cssContent,
                  cssFilename: content.cssFilename,
                })
              ),
            ])(),
        ])(),
    ])();
  };
