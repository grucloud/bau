import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";
import Path from "path";
import createJSDOM from "./jsdom.js";
import createContext from "./context.js";
import { isPageChunk } from "./utils.js";
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
      if (isPageChunk(chunk)) {
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

export default async function pluginBausaurus(config) {
  return [
    {
      name: "vite-plugin-bausaurus",
      load: load(config),
      generateBundle: generateBundle(config),
    },
  ];
}
