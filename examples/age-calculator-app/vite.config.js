import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/frontendmentor/age-calculator-app/",
    build: { outDir: "../../dist/frontendmentor/age-calculator-app" },
    server: {
      open: true,
    },
  };
});
