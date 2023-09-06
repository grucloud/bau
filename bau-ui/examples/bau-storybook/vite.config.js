import { resolve } from "path";
import pkg from "./package.json";
import { defineConfig } from "vite";
import createSvgSpritePlugin from "vite-plugin-svg-sprite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/bau-ui/",
    build: { outDir: "../../../dist/bau-ui" },
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
    plugins: [
      createSvgSpritePlugin({
        symbolId: "icon-[name]-[hash]",
      }),
    ],
  };
});
