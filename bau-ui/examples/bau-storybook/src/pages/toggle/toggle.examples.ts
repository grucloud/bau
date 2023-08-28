import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import toggleGridItem from "./toggle-grid-item.ts";

import toggleDefault from "./toggle-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./toggle-example-default.ts?raw";

export const toggleSpec = {
  title: "Toggle",
  package: "toggle",
  description: "The toggle component displays a button with 2 states",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",
  importStatement: `import toggle from "@grucloud/bau-ui/toggle";`,
  examples: [
    {
      title: "Simple Toggle",
      description: "A simple toggle.",
      code: codeExampleDefault,
      createComponent: toggleDefault,
    },
  ],
  gridItem: toggleGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(toggleSpec);
};
