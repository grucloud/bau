import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/frontendmentor/calculator/",
    build: { outDir: "../../dist/frontendmentor/calculator" },
    server: {
      open: true,
    },
  };
});
