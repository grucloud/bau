import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/frontendmentor/launch-countdown-timer/",
    build: { outDir: "../../dist/frontendmentor/launch-countdown-timer" },
    server: {
      open: true,
    },
  };
});
