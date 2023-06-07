import { defineConfig } from "vite";
import pkg from "./package.json";
import path from "path";

import { createMpaPlugin, createPages } from "vite-plugin-virtual-mpa";

const base = "/";

const pages = createPages([
  {
    name: "landing",
    filename: "index.html",
    entry: "/src/pages/landing/entry.js",
    data: {
      title: "Landing page",
      description: "Landing",
    },
  },
  {
    name: "admin",
    filename: "admin.html",
    entry: "/src/pages/admin/entry.js",
    data: {
      title: "Admin",
      description: "Admin Area",
    },
  },
  {
    name: "storybook",
    filename: "storybook.html",
    entry: "/src/pages/storybook/entry.js",
    data: {
      title: "Story Book",
      description: "Story Book",
    },
  },
]);

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base,
    build: { modulePreload: { polyfill: false } },
    server: {
      open: true,
      proxy: {
        "/api/v1/": {
          target: "http://localhost:9000",
          changeOrigin: true,
        },
      },
    },
    define: {
      NODE_ENV: JSON.stringify(
        command === "serve" ? "development" : "production"
      ),
      __VERSION__: JSON.stringify(pkg.version),
    },
    plugins: [
      createMpaPlugin({
        template: "src/pages/template.html",
        pages,
        htmlMinify: true,
      }),
    ],
    resolve: {
      alias: { "@": path.resolve(__dirname, "src") },
    },
  };
});
