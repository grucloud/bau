import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/frontendmentor/news-homepage/",
    build: { outDir: "../../dist/frontendmentor/news-homepage" },
    server: {
      open: true,
    },
  };
});
