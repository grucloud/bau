import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import loadingButtonGridItem from "./loadingButton-grid-item.ts";

import loadingButtonDefault from "./loadingButton-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./loadingButton-example-default.ts?raw";

export const loadingButtonSpec = {
  title: "LoadingButton",
  package: "loadingButton",
  description:
    "The loadingButton component displays a button with a loading indicator.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",
  importStatement: `import loadingButton from "@grucloud/bau-ui/loadingButton";`,
  examples: [
    {
      title: "Simple LoadingButton",
      description: "A simple loadingButton.",
      code: codeExampleDefault,
      createComponent: loadingButtonDefault,
    },
  ],
  gridItem: loadingButtonGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(loadingButtonSpec);
};
