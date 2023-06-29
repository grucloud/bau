import assert from "assert";
import { processMarkdownContent, buildBodyHtml } from "./src/bausaurus";
import rubico from "rubico";
import rubicox from "rubico/x";
import path from "path";

const { pipe, tap, get } = rubico;
const { when } = rubicox;

const bauComponent = ({ head, body }) => `
export default function(){
    return {
        head:\`${head}\`, 
        body: \`${body}\`
    }
}
`;
const transform = ({ code, id, siteConfig: { body } }) =>
  pipe([
    when(
      () => id.endsWith(".md"),
      pipe([
        () => ({ code, id }),
        processMarkdownContent,
        ({ contentHtml, toc }) => buildBodyHtml({ body, contentHtml, toc }),
        tap((params) => {
          assert(true);
        }),
        bauComponent,
        (code) => ({
          code,
        }),
      ])
    ),
  ])();

export const plugin = async (siteConfig = {}) => {
  const { srcDir = path.resolve("./docs") } = siteConfig;

  return [
    {
      name: "vite-plugin-bausaurus",
      enforce: "pre",
      async configResolved(resolvedConfig) {
        //console.log("configResolved", resolvedConfig);
      },
      config() {
        const baseConfig = {
          server: {
            fs: {
              allow: [
                // DIST_CLIENT_PATH,
                srcDir,
                // searchForWorkspaceRoot(process.cwd()),
              ],
            },
          },
        };
        return baseConfig;
      },
      transform(code, id) {
        console.log("transform", id);
        return transform({ code, id, siteConfig });
      },
      resolveId(id) {
        console.log("resolveId", id);
      },
      load(id) {
        console.log("load", id);
      },
      configureServer(server) {
        return () => {
          server.middlewares.use((req, res, next) => {
            console.log(`middlewares ${req.method.toUpperCase()} ${req.url}`);
            next();
          });
        };
      },
      renderChunk(code, chunk) {
        console.log("renderChunk", chunk);
      },
      generateBundle(_options, bundle) {
        console.log("generateBundle", bundle);
        debugger;
      },
    },
  ];
};

export default plugin;
