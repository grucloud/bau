import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    build: {
      lib: {
        entry: resolve(__dirname, "src/bau-css.js"),
        name: "BauCss",
        fileName: "bau-css",
      },
    },
    server: {
      open: true,
    },
    test: {
      environment: "happy-dom",
    },
  };
});
