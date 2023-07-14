import docApp from "@grucloud/bausaurus-theme-classic/DocApp.js";

export default ({ rootDir }) => {
  return {
    docApp,
    site: {
      rootDir,
      favicon: "/grucloud.svg",
      base: "/docs/",
      outDir: "dist/docs",
      srcDir: "docs",
      title: "Your title",
      description: "Your description",
      keywords: ["Your Tags", "My Other Tags"],
      lang: "en",
    },
  };
};
