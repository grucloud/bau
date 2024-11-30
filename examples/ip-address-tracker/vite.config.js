import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/frontendmentor/ip-address-tracker/",
    build: { outDir: "../../dist/frontendmentor/ip-address-tracker" },
    server: {
      open: true,
    },
  };
});
