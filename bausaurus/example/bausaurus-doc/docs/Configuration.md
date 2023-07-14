---
title: "Configuration"
---

The configuration file is called **bausaurus.config.js**, its content allows to specify how the web site will be generated.

```js
import { App } from "./src/appDoc/App.js";

export default ({ rootDir }) => {
  return {
    docApp: App,
    viteConfig: {
      base: "/",
      build: { outDir: "dist/" },
    },
    site: {
      rootDir,
      srcDir: "docs",
      title: "My super duper website",
      description: "A description of your website",
      keywords: ["Some tags", "My Other Tags"],
      lang: "en",
      favicon: "/my-logo.svg",
      base: "/docs/",
      outDir: "dist/docs",
    },
  };
};
```
