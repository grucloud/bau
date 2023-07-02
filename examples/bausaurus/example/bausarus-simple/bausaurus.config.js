import docApp from "./src/DocApp.js";

export default ({ rootDir }) => {
  return {
    docApp,
    rootDir,
    site: {
      rootDir,
      base: "/",
      outDir: "dist/docs",
      //srcDir: "../../../../../grucloud/docusaurus/docs",
      srcDir: "docs",
      title: "My Site",
      description: "Documentation for My Site",
      lang: "en",
    },
  };
};
