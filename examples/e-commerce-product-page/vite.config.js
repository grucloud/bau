import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/frontendmentor/e-commerce-product-page/",
    build: { outDir: "../../dist/frontendmentor/e-commerce-product-page" },
    server: {
      open: true,
    },
  };
});
