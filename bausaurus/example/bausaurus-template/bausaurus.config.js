import { App } from "./src/appDoc/App.js";

export default ({ rootDir }) => {
  return {
    docApp: App,
    site: {
      rootDir,
      favicon: "/grucloud.svg",
      //base: "/docs/",
      baseDoc: "docs/",
      outDir: "dist/docs",
      srcDir: "docs",
      title: "Your title",
      description: "Your description",
      keywords: ["Your Tags", "My Other Tags"],
      lang: "en",
    },
  };
};
