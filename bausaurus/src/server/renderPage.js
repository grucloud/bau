import assert from "assert";
import fs from "fs-extra";
import Path from "path";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";
import createContext from "@grucloud/bausaurus-core/context.js";

const { pipe, eq, get, tap, filter, and, all, map, assign } = rubico;
const { callProp, when } = rubicox;

import { processMarkdownContent } from "./markdown.js";
import createJSDOM from "./jsdom.js";
import { navBarTreeToBreadcrumbs } from "./breadcrumbs.js";
import { navBarTreeToPaginationNav } from "./paginationNav.js";
import {
  extractCSS,
  inferCssFileName,
  writeExtractedCss,
} from "./cssExtract.js";
import { isMarkdownPageChunk } from "./utils.js";

export const isOutput = (name) =>
  and([eq(get("type"), "chunk"), eq(get("name"), name)]);

export const isOutputCss = and([
  eq(get("type"), "asset"),
  pipe([get("name", ""), callProp("endsWith", ".css")]),
]);

export const renderPages = (config) => (output) =>
  pipe([
    tap((params) => {
      assert(config);
      assert(output);
    }),
    () => output,
    all({
      config: () => config,
      output: () => output,
      appChunks: filter(isOutput("docAppEntry")),
      cssChunks: filter(isOutputCss),
    }),
    (renderParam) =>
      pipe([
        () => output,
        filter(isMarkdownPageChunk),
        map(pipe([renderPage(renderParam)])),
      ])(),
    tap((params) => {
      assert(true);
    }),
  ])();

const renderDocApp = async ({
  dom,
  context,
  docApp,
  navBarTree,
  breadcrumbs,
  contentHtml,
  toc,
  paginationNav = {},
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
  viteConfig,
  siteData,
  title,
  description,
  content,
  appChunks,
  cssChunks,
  metadataScript,
}) => `
<!DOCTYPE html>
<html lang="${siteData.lang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="generator" content="Bausaurus">
    <title>${title}</title>
    <meta name="og:title" content="${title}" />
    <meta name="description" content="${description}">
    <meta name="og:description" content="${description}">
  ${
    siteData.keywords &&
    `  <meta name="keywords" content="${siteData.keywords.join(",")}" />`
  }
    <meta name="twitter:card" content="summary_large_image" />
    ${siteData.favicon ? `<link rel="icon" href="${siteData.favicon}">` : ""}
    ${cssChunks
      .map(
        (cssChunk) =>
          `<link rel="stylesheet" href="${siteData.base}${cssChunk.fileName}">`
      )
      .join("\n")}
    <link rel="stylesheet" href="${siteData.base}${content.cssFilename}">
    ${appChunks
      .map(
        (appChunk) =>
          `<script type="module" src="${viteConfig.base}${appChunk.fileName}"></script>`
      )
      .join("\n")}
  </head>
  <body>
    <div id="app">${content.body}</div>
    <script>${metadataScript}</script>
  </body>
</html>`;

const assignFrontMatterData = ({ frontmatter }) =>
  pipe([
    when(
      () => frontmatter.title,
      assign({ title: ({ title }) => `${frontmatter.title} | ${title}` })
    ),
    when(
      () => frontmatter.description,
      assign({ description: () => frontmatter.description })
    ),
  ]);

export const renderPage =
  ({ config, output, appChunks, cssChunks, assets }) =>
  async (chunk) => {
    assert(config);
    assert(output);
    assert(chunk);
    assert(chunk.facadeModuleId);
    const { site, viteConfig } = config;
    assert(site);
    assert(site.srcDir);
    assert(site.outDir);
    assert(site.base);

    const dom = createJSDOM();
    // TODO
    const context = createContext({
      window: dom.window,
      config: { base: viteConfig.base },
    });
    const pageMd = chunk.name.replace(site.base.slice(1), "");
    const page = pageMd.replace(".md", "");
    assert(page);
    const siteData = config.site;
    // Use use data from frontmatter
    const title = siteData.title;
    const description = siteData.description;
    let metadataScript = `__BAUSAURUS_SITE_DATA__ = {prod:true}`;

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
                viteConfig,
                siteData,
                title,
                description,
                content,
                cssChunks,
                appChunks,
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
                  viteConfig: config.viteConfig,
                  site: config.site,
                  cssContent: content.cssContent,
                  cssFilename: content.cssFilename,
                })
              ),
            ])(),
        ])(),
    ])();
  };
