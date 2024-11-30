import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/frontendmentor/faq-accordion/",
    build: { outDir: "../../dist/frontendmentor/faq-accordion" },
    server: {
      open: true,
    },
  };
});
