import assert from "assert";
import fs from "fs-extra";
import path from "path";

import { normalizePath } from "vite";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";

const { pipe, eq, get, tap, filter, and, all, map } = rubico;
const { callProp, find } = rubicox;

import { processMarkdownContent } from "./markdown.js";
import createContext from "./context.js";
import createJSDOM from "./jsdom.js";

import { sanitizeFileName } from "./sanitizeFileName.js";
import { isPageChunk } from "./utils.js";
import { EXTERNAL_URL_RE } from "./constants.js";

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

const renderDocApp = ({ docApp, contentHtml, toc }) => {
  const dom = createJSDOM();
  const context = createContext({ document: dom.window.document });
  assert(contentHtml);
  assert(toc);
  const DocApp = docApp(context);
  // This will fill the dom.window.document.head with the style
  const content = DocApp({ contentHtml, toc }).outerHTML;
  return {
    head: dom.window.document.head.innerHTML,
    body: content,
  };
};

const resolvePageImports = ({ site, pageMd, output, appChunk }) => {
  assert(site.srcDir);
  assert(pageMd);
  assert(output);
  assert(appChunk);
  //TODO add rootDir
  let srcPath = path.resolve(site.srcDir, pageMd);
  try {
    srcPath = fs.realpathSync(srcPath);
  } catch (e) {}
  srcPath = normalizePath(srcPath);
  const pageChunk = output.find(
    (chunk) => chunk.type === "chunk" && chunk.facadeModuleId === srcPath
  );
  assert(pageChunk);
  return [
    ...appChunk.imports,
    ...appChunk.dynamicImports,
    ...pageChunk.imports,
    ...pageChunk.dynamicImports,
  ];
};

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

    const pageMd = chunk.name;
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

    const content = renderDocApp({
      docApp: config.docApp,
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
      ? `<link rel="preload stylesheet" href="${siteData.base}${cssChunk.fileName}" as="style">`
      : "";

    let preloadLinks = appChunk
      ? [
          ...new Set([
            ...resolvePageImports({ site, pageMd, output, appChunk }),
            pageClientJsFileName,
          ]),
        ]
      : [];

    let prefetchLinks = [];

    const toHeadTags = (files, rel) =>
      files.map((file) => [
        "link",
        {
          rel,
          // don't add base to external urls
          href: (EXTERNAL_URL_RE.test(file) ? "" : siteData.base) + file,
        },
      ]);

    const preloadHeadTags = toHeadTags(preloadLinks, "modulepreload");
    const prefetchHeadTags = toHeadTags(prefetchLinks, "prefetch");

    let inlinedScript = "";
    //    let metadataScript = `__VP_HASH_MAP__ = JSON.parse(${hashMapString})\n`;
    let metadataScript = "";
    // if (siteDataString.includes("_vp-fn_")) {
    //   metadataScript += `${deserializeFunctions.toString()}\n__VP_SITE_DATA__ = deserializeFunctions(JSON.parse(${siteDataString}))`;
    // } else {
    //   metadataScript += `__VP_SITE_DATA__ = JSON.parse(${siteDataString})`;
    // }

    const html = `
  <!DOCTYPE html>
  <html lang="${siteData.lang}">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>${title}</title>
      <meta name="description" content="${description}">
      ${stylesheetLink}
      ${
        appChunk
          ? `<script type="module" src="${siteData.base}${appChunk.fileName}"></script>`
          : ``
      }
      ${content.head}
    </head>
    <body>
      <div id="app">${content.body}</div>
      <script>${metadataScript}</script>
      ${inlinedScript}
    </body>
  </html>`.trim();
    const htmlFileName = path.join(
      config.rootDir,
      config.site.outDir,
      pageHtml
    );

    await fs.ensureDir(path.dirname(htmlFileName));
    await fs.writeFile(htmlFileName, html);
  };
