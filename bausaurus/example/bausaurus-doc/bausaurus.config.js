import { App } from "./src/appDoc/App.js";

export default ({ rootDir }) => {
  return {
    docApp: App,
    viteConfig: {
      base: "/bau/bausaurus/",
      build: { outDir: "../../../dist/bausaurus" },
    },
    site: {
      rootDir,
      favicon: "/grucloud.svg",
      baseDoc: "docs/",
      outDir: "../../../dist/bausaurus/docs",
      srcDir: "docs",
      title: "Bausarus",
      description: "SSG built with Bau",
      keywords: ["SSG", "Static Site Generation"],
      lang: "en",
    },
  };
};
