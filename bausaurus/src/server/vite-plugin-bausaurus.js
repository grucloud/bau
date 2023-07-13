import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";
import Path from "path";
import createJSDOM from "./jsdom.js";
import createContext from "./context.js";
import { isMarkdownPageChunk } from "./utils.js";
import { hashRE } from "./constants.js";
import { processMarkdownContent } from "./markdown.js";
import { pagesHashMapToString } from "./pagesHashMap.js";
import { navBarTreeToBreadcrumbs } from "./breadcrumbs.js";
import { navBarTreeToPaginationNav } from "./paginationNav.js";
import { writeNavBarTree } from "./navBarTree.js";
import fs from "fs/promises";

const { pipe, tap, eq, switchCase } = rubico;
const { when, identity, callProp } = rubicox;

const escape = (content) => content.replace(/\\|`|\$/g, "\\$&");

const contentToEsModule =
  ({ toBreadcrumbs, toPaginationNav }) =>
  ({ contentHtml, toc, frontmatter }) =>
    `
export const frontmatter = ${JSON.stringify(frontmatter)}
export const toc = ${JSON.stringify(toc)}
export const breadcrumbs =  ${JSON.stringify(toBreadcrumbs())}
export const paginationNav =  ${JSON.stringify(toPaginationNav())}
export const contentHtml = \`${escape(contentHtml)}\`
`;

const dom = createJSDOM();
const context = createContext({
  window: dom.window,
});

const generateBundle =
  ({ pageToHashMap }) =>
  (_options, bundle) => {
    assert(pageToHashMap);
    for (const name in bundle) {
      const chunk = bundle[name];
      if (isMarkdownPageChunk(chunk)) {
        const match = chunk.fileName.match(hashRE);
        const hash = match[1];
        assert(hash);
        pageToHashMap.set(chunk.name, hash);
      }
    }
  };

const load =
  ({ site, navBarTree, pageToHashMap }) =>
  (id) =>
    pipe([
      () => id,
      tap((id) => {
        assert(id);
        assert(site);
        assert(navBarTree);
        assert(pageToHashMap);
        //console.log("load", id);
      }),
      switchCase([
        eq(identity, "/src/navBarTree.js"),
        pipe([() => ({ navBarTree }), writeNavBarTree]),
        eq(identity, "/docs/hashmap.json"),
        pipe([() => pageToHashMap, pagesHashMapToString]),
        pipe([callProp("endsWith", ".md")]),
        pipe([
          // Only in dev
          when(
            callProp("startsWith", site.base),
            pipe([
              callProp("replace", site.base, ""),
              (filename) => Path.resolve(site.rootDir, site.srcDir, filename),
            ])
          ),
          (filename) => fs.readFile(filename, "utf-8"),
          (code) => ({ code, filename: id }),
          processMarkdownContent({
            dom,
            context,
          }),
          contentToEsModule({
            toBreadcrumbs: () =>
              navBarTreeToBreadcrumbs({ site, filename: id, navBarTree }),
            toPaginationNav: () =>
              navBarTreeToPaginationNav({ site, filename: id, navBarTree }),
          }),
          tap((params) => {
            assert(true);
          }),
        ]),
        () => undefined,
      ]),
    ])();

const cleanUrl = (url) => url.replace(/#.*$/s, "").replace(/\?.*$/s, "");

const configureServer = (config) => (server) => {
  // serve our /docs/index.html
  const { site } = config;
  assert(site.base);
  return () => {
    server.middlewares.use(async (req, res, next) => {
      const url = req.url && cleanUrl(req.url);
      if (req?.originalUrl?.startsWith(site.base) && url?.endsWith(".html")) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        let html = `<!DOCTYPE html>
<html>
  <head>
    <title>${site.title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="description" content="">
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/appDoc/docAppEntry.js"></script>
    <script>
    __BAUSAURUS_SITE_DATA__ = { prod: false };
  </script>
  </body>
</html>`;
        html = await server.transformIndexHtml(url, html, req.originalUrl);
        res.end(html);
        return;
      }
      next();
    });
  };
};

export default async function pluginBausaurus(config) {
  return [
    {
      name: "vite-plugin-bausaurus",
      load: load(config),
      generateBundle: generateBundle(config),
      configureServer: configureServer(config),
    },
  ];
}
