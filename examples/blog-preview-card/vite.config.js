import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/frontendmentor/blog-preview-card/",
    build: { outDir: "../../dist/frontendmentor/blog-preview-card" },
    server: {
      open: true,
    },
  };
});
