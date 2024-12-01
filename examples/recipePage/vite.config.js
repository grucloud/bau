import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/frontendmentor/recipePage/",
    build: {
      outDir: "../../dist/frontendmentor/recipePage",
    },
    server: {
      open: true,
    },
  };
});
