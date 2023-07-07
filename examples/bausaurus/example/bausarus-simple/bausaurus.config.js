import docApp from "./src/DocApp.js";

export default ({ rootDir }) => {
  return {
    docApp,
    site: {
      rootDir,
      favicon: "/grucloud.svg",
      base: "/docs/",
      outDir: "dist/docs",
      //srcDir: "../../../../../grucloud/docusaurus/docs",
      //srcDir: "../../../../",
      srcDir: "docs",
      title: "My Site",
      description: "Documentation for My Site",
      lang: "en",
    },
  };
};
