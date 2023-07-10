import assert from "assert";
import { defineConfig } from "vite";
import rubico from "rubico";
import virtual from "@rollup/plugin-virtual";
import bausaurusPlugin from "./vite-plugin-bausaurus.js";
import { findMarkdownInputs } from "./utils.js";
import { writeNavBarTree } from "./navBarTree.js";

const { pipe, tap } = rubico;

export default defineConfig((config) =>
  pipe([
    () => config,
    findMarkdownInputs(),
    (inputs) => ({
      root: config.site.rootDir,
      preview: {
        port: 8080,
        open: true,
      },
      optimizeDeps: {
        include: ["@grucloud/bau"],
      },
      server: {
        open: true,
      },
      build: {
        // TODO false for now
        minify: false,
        rollupOptions: {
          preserveEntrySignatures: "allow-extension",
          input: {
            ...inputs,
            index: "./index.html",
            main: "./src/main.js",
            navBarTree: "./src/navBarTree.js",
          },
        },
      },
      plugins: [
        virtual({
          "./src/navBarTree.js": writeNavBarTree(config),
        }),
        bausaurusPlugin(config),
      ],
    }),
  ])()
);
