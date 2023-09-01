import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import buttonGridItem from "./button-grid-item.ts";

import buttonDefault from "./button-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./button-example-default.ts?raw";

import buttonDisabled from "./button-disabled.ts";
// @ts-ignore
import codeExampleDisabled from "./button-disabled.ts?raw";

export const buttonSpec = {
  title: "Button",
  package: "button",
  description: "The button component.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",
  importStatement: `import button from "@grucloud/bau-ui/button";`,
  examples: [
    {
      title: "Solid Button",
      description: "A simple button.",
      code: codeExampleDefault,
      createComponent: buttonDefault,
    },
    {
      title: "Disabled Button",
      description: "A disabled button.",
      code: codeExampleDisabled,
      createComponent: buttonDisabled,
    },
  ],
  gridItem: buttonGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(buttonSpec);
};
