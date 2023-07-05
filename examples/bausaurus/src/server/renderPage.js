import assert from "assert";
import fs from "fs-extra";
import Path from "path";
import os from "os";
//import { normalizePath } from "vite";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";
import { createHash } from "crypto";

const { pipe, eq, get, tap, filter, and, all, map } = rubico;
const { callProp, find } = rubicox;

import { processMarkdownContent } from "./markdown.js";
import createContext from "./context.js";
import createJSDOM from "./jsdom.js";

import { sanitizeFileName } from "./sanitizeFileName.js";
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

const renderDocApp = async ({ docApp, navBarTree, contentHtml, toc }) => {
  assert(docApp);
  assert(navBarTree);
  assert(contentHtml);
  assert(toc);

  const dom = createJSDOM();
  const context = createContext({
    window: dom.window,
  });
  const DocApp = await docApp(context);
  // This will fill the dom.window.document.head with the style
  const content = await DocApp({ navBarTree, contentHtml, toc }).outerHTML;
  const cssContent = extractCSS({ document: dom.window.document });
  const cssFilename = inferCssFileName({ cssContent });
  return {
    body: content,
    cssContent,
    cssFilename,
  };
};

// const resolvePageImports = ({ site, pageMd, output, appChunk }) => {
//   assert(site.srcDir);
//   assert(site.rootDir);

//   assert(pageMd);
//   assert(output);
//   assert(appChunk);
//   let srcPath = Path.resolve(site.rootDir, site.srcDir, pageMd);
//   try {
//     srcPath = fs.realpathSync(srcPath);
//   } catch (e) {}
//   srcPath = normalizePath(srcPath);
//   const pageChunk = output.find(
//     (chunk) => chunk.type === "chunk" && chunk.facadeModuleId === srcPath
//   );
//   assert(pageChunk);
//   return [
//     ...appChunk.imports,
//     ...appChunk.dynamicImports,
//     ...pageChunk.imports,
//     ...pageChunk.dynamicImports,
//   ];
// };

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
    assert(config.pageToHashMap);

    const pageMd = chunk.name.replace(site.base.slice(1), "");
    const page = pageMd.replace(".md", "");
    assert(page);
    const pageHtml = `${page}.html`;
    const pageName = sanitizeFileName(page.replace(/\//g, "_"));
    //TODO
    //const siteData = resolveSiteDataByRoute(config.site, routePath)
    const siteData = config.site;
    const code = await fs.readFile(chunk.facadeModuleId, "utf-8");

    const { contentHtml, toc, frontmatter } = await processMarkdownContent({
      filename: chunk.facadeModuleId,
      code,
      toc: config.toc,
    });

    assert(contentHtml);
    assert(toc);
    assert(frontmatter);

    const content = await renderDocApp({
      docApp: config.docApp,
      navBarTree: config.navBarTree,
      contentHtml,
      toc,
    });

    const pageHash = config.pageToHashMap.get(chunk.name);
    assert(pageHash);
    const pageClientJsFileName = `assets/${pageName}.${pageHash}.js`;
    // Use use data from frontmatter
    const title = siteData.title;
    const description = siteData.description;
    const stylesheetLink = cssChunk
      ? `<link rel="preload stylesheet" href="/${cssChunk.fileName}" as="style">`
      : "";

    let metadataScript = "";

    const html = `
  <!DOCTYPE html>
  <html lang="${siteData.lang}">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>${title}</title>
      <meta name="description" content="${description}">
      <link rel="stylesheet" href="/assets/${content.cssFilename}">
      ${stylesheetLink}
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
  </html>`.trim();
    const htmlFileName = Path.join(
      config.rootDir,
      config.site.outDir,
      pageHtml
    );

    await fs.ensureDir(Path.dirname(htmlFileName));
    await fs.writeFile(htmlFileName, html);
    await writeExtractedCss({
      site: config.site,
      cssContent: content.cssContent,
      cssFilename: content.cssFilename,
    });
  };
