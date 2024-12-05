import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/frontendmentor/newsletter-signup-form/",
    build: { outDir: "../../dist/frontendmentor/newsletter-signup-form" },
    server: {
      open: true,
    },
  };
});
