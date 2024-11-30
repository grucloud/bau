import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/frontendmentor/product-preview-card/",
    build: {
      outDir: "../../dist/frontendmentor/product-preview-card",
    },
    server: {
      open: true,
    },
  };
});
