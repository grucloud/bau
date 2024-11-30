import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/frontendmentor/contact-form/",
    build: { outDir: "../../dist/frontendmentor/contact-form" },
    server: {
      open: true,
    },
  };
});
