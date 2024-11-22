import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/frontendmentor/multi-step-form/",
    build: { outDir: "../../dist/frontendmentor/multi-step-form" },
    server: {
      open: true,
    },
  };
});
