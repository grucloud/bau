import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/frontendmentor/result-summary-component/",
    build: {
      outDir: "../../dist/frontendmentor/result-summary-component",
    },
    server: {
      open: true,
    },
  };
});
