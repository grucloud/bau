import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/frontendmentor/mortgage-repayment-calculator/",
    build: {
      outDir: "../../dist/frontendmentor/mortgage-repayment-calculator",
    },
    server: {
      open: true,
    },
  };
});
