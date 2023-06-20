import { resolve } from "path";
import { defineConfig } from "vite";
import createSvgSpritePlugin from "vite-plugin-svg-sprite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/",
    build: {},
    server: {
      open: true,
    },
    plugins: [
      createSvgSpritePlugin({
        symbolId: "icon-[name]-[hash]",
      }),
    ],
  };
});
