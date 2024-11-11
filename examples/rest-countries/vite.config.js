import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/frontendmentor/rest-countries/",
    build: { outDir: "../../dist/frontendmentor/rest-countries" },
    server: {
      open: true,
    },
  };
});
