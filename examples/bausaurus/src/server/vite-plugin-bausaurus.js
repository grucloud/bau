import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";

import { isPageChunk } from "./utils.js";
import { buildNavBarTree } from "./navBarTree.js";
import { DIST_CLIENT_PATH, hashRE } from "./constants.js";
import { processMarkdownContent } from "./markdown.js";

const { pipe, tap } = rubico;
const { when } = rubicox;

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
        console.log("transform", id);
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

// const configureServer = (server) => {
//   return () => {
//     server.middlewares.use((req, res, next) =>
//       pipe([
//         tap((params) => {
//           console.log(`middlewares ${req.method.toUpperCase()} ${req.url}`);
//         }),
//         () => req,
//         when(
//           pipe([get("url", ""), callProp("endsWith", ".html")]),
//           pipe([
//             tap((params) => {
//               assert(true);
//             }),
//             async () => {
//               res.statusCode = 200;
//               res.setHeader("Content-Type", "text/html");
//               let html = `<!DOCTYPE html>
// <html>
// <head>
// <title></title>
// <meta charset="utf-8">
// <meta name="viewport" content="width=device-width,initial-scale=1">
// <meta name="description" content="">
// </head>
// <body>
// <div id="app"></div>
// <script type="module" src="/@fs/${APP_PATH}/index.js"></script>
// </body>
// </html>`;
//               html = await server.transformIndexHtml(
//                 req.url,
//                 html,
//                 req.originalUrl
//               );
//               res.end(html);
//               return;
//             },
//           ])
//         ),
//         () => next(),
//       ])()
//     );
//   };
// };

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
  const { pageToHashMap } = config;
  assert(pageToHashMap);
  const navBarTree = await buildNavBarTree(config.site);
  return [
    {
      name: "vite-plugin-bausaurus",
      config: makeConfig(config),
      transform: transform(config),
      renderChunk: renderChunk(config),
      generateBundle: generateBundle({ pageToHashMap }),
    },
  ];
}
