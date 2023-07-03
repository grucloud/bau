import { defineConfig } from "vite";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";
import bausaurusPlugin from "./vite-plugin-bausaurus.js";
import { findMarkdownInputs } from "./utils.js";

const { pipe, tap, get, eq, flatMap, switchCase, filter, or, and } = rubico;
const { callProp } = rubicox;

export default defineConfig((config) =>
  pipe([
    () => config,
    findMarkdownInputs(),
    (inputs) => ({
      root: config.rootDir,
      server: {
        open: true,
      },
      optimizeDeps: {
        include: ["@grucloud/bau"],
      },
      // server: {
      //   fs: {
      //     allow: [config.site.srcDir],
      //     strict: false,
      //   },
      // },
      build: {
        // TODO false for now
        minify: false,
        rollupOptions: {
          preserveEntrySignatures: "allow-extension",
          output: {
            format: "es",
            assetFileNames: "assets/[name].[hash].[ext]",
            entryFileNames: "assets/[name].[hash].js",
          },
          input: { ...inputs, index: "/index.html", main: "/src/main.js" },
        },
      },
      plugins: [bausaurusPlugin(config)],
    }),
  ])()
);
