import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/frontendmentor/interactive-comments-section/",
    build: { outDir: "../../dist/frontendmentor/interactive-comments-section" },
    server: {
      open: true,
    },
  };
});
