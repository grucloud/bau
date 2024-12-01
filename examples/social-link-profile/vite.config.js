import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/bau/frontendmentor/social-link-profile/",
    build: {
      outDir: "../../dist/frontendmentor/social-link-profile",
    },
    server: {
      open: true,
    },
  };
});
