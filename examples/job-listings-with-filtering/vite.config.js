import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/frontendmentor/job-listings-with-filtering/",
    build: { outDir: "../../dist/frontendmentor/job-listings-with-filtering" },
    server: {
      open: true,
    },
  };
});
