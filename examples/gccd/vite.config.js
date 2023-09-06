import { defineConfig } from "vite";
import pkg from "./package.json";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/",
    build: { outDir: "dist" },
    server: {
      open: true,
      proxy: {
        "/api/v1/": {
          target: "http://localhost:9000",
          changeOrigin: true,
        },
      },
    },
    define: {
      __VERSION__: JSON.stringify(pkg.version),
    },
  };
});
