import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";

import { isPageChunk } from "./utils.js";
import { DIST_CLIENT_PATH, hashRE } from "./constants.js";
import { processMarkdownContent } from "./markdown.js";
import { pagesHashMapToString } from "./pagesHashMap.js";

const { pipe, tap, eq, switchCase } = rubico;
const { when, identity } = rubicox;

const escape = (content) => content.replace(/\\|`|\$/g, "\\$&");

const contentToEsModule = ({ contentHtml, toc }) => `export default function(){
    return {
      contentHtml:\`${escape(contentHtml.value)}\`, 
      toc: \`${JSON.stringify(toc)}\`
    }
}`;

const transform =
  ({}) =>
  (code, id) =>
    pipe([
      tap((params) => {
        assert(code);
        assert(id);
        //console.log("transform", id);
      }),
      when(
        () => id.endsWith(".md"),
        pipe([
          () => ({ code, filename: id }),
          processMarkdownContent,
          contentToEsModule,
          tap((params) => {
            assert(true);
          }),
        ])
      ),
    ])();

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

const load = ({ navBarTree, pageToHashMap }) =>
  pipe([
    tap((id) => {
      assert(id);
      assert(navBarTree);
      assert(pageToHashMap);
      console.log("load", id);
    }),
    //TODO
    switchCase([
      eq(identity, "/docs/navBarTree.json"),
      pipe([() => navBarTree, JSON.stringify]),
      eq(identity, "/docs/hashmap.json"),
      pipe([() => pageToHashMap, pagesHashMapToString]),
      () => undefined,
    ]),
  ]);

const makeConfig =
  ({ site }) =>
  () => {
    assert(site);
    const baseConfig = {
      server: {
        fs: {
          allow: [DIST_CLIENT_PATH, process.cwd(), site.srcDir],
        },
      },
    };
    return baseConfig;
  };

const renderChunk = (config) => (code, chunk) => {
  //console.log("renderChunk", code, chunk);
};

export default async function pluginBausaurus(config) {
  assert(config);
  return [
    {
      name: "vite-plugin-bausaurus",
      config: makeConfig(config),
      load: load(config),
      transform: transform(config),
      renderChunk: renderChunk(config),
      generateBundle: generateBundle(config),
    },
  ];
}
