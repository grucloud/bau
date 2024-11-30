import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/frontendmentor/product-list-cart/",
    build: {
      outDir: "../../dist/frontendmentor/product-list-cart",
    },
    server: {
      open: true,
    },
  };
});
