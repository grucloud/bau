import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/frontendmentor/interactive-rating-component/",
    build: { outDir: "../../dist/frontendmentor/interactive-rating-component" },
    server: {
      open: true,
    },
  };
});
