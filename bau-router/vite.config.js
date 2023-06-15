import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    build: {
      lib: {
        entry: resolve(__dirname, "src/bau-router.js"),
        name: "BauRouter",
        fileName: "bau-router",
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
