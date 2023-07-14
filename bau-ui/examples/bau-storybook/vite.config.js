import { resolve } from "path";
import pkg from "./package.json";
import { defineConfig } from "vite";
import createSvgSpritePlugin from "vite-plugin-svg-sprite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/bau-ui/",
    build: { outDir: "dist/bau-ui" },
    server: {
      open: true,
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
