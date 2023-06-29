import { defineConfig } from "vite";
import bausaurusPlugin from "./vite-plugin-bausaurus";
import path from "path";
import body from "./src/Body.js";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    root: "docs",
    server: {
      open: true,
    },
    build: {
      rollupOptions: {
        input: {
          "pippo.md": path.resolve("docs/Article1.md"),
        },
      },
    },
    plugins: [bausaurusPlugin({ body })],
  };
});
