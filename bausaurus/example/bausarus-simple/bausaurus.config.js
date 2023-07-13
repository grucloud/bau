import docApp from "./src/appDoc/DocApp.js";

export default ({ rootDir }) => {
  return {
    docApp,
    site: {
      rootDir,
      favicon: "/grucloud.svg",
      base: "/docs/",
      outDir: "dist/docs",
      //srcDir: "../../../../grucloud/bausaurus/docs",
      //srcDir: "../../../",
      srcDir: "docs",
      title: "My Site",
      description: "Documentation for My Site",
      keywords: ["My Tags", "My Other Tags"],
      lang: "en",
    },
  };
};
