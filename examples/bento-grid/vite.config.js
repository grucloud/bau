import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/frontendmentor/bento-grid/",
    build: { outDir: "../../dist/frontendmentor/bento-grid" },
    server: {
      open: true,
    },
  };
});
