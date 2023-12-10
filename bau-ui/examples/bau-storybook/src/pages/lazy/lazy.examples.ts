import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import lazyDefault from "./lazy-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./lazy-example-default.ts?raw";

import lazyLoading from "./lazy-loading.ts";
// @ts-ignore
import codeLoading from "./lazy-loading.ts?raw";

export const lazySpec = {
  title: "Lazy",
  package: "lazy",
  description:
    "The lazy component delays the loading of a component, hence improving the initial bundle size.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/lazy/lazy.js",
  importStatement: `import lazy from "@grucloud/bau-ui/lazy";`,
  examples: [
    {
      title: "Simple",
      description: "Lazy load a component.",
      code: codeExampleDefault,
      createComponent: lazyDefault,
    },
    {
      title: "Custom Loader",
      description: "Custom loader and error",
      code: codeLoading,
      createComponent: lazyLoading,
    },
  ],
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(lazySpec);
};
