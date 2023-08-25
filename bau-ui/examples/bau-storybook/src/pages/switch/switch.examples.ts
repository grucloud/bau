import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import switchGridItem from "./switch-grid-item.ts";

import switchDefault from "./switch-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./switch-example-default.ts?raw";

export const switchSpec = {
  title: "Switch",
  package: "switch",
  description:
    "The switch component allows a user to to choose a boolean value.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",
  importStatement: `import createSwitch from "@grucloud/bau-ui/switch";`,
  examples: [
    {
      title: "Default",
      description: "A simple switch.",
      code: codeExampleDefault,
      createComponent: switchDefault,
    },
  ],
  gridItem: switchGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(switchSpec);
};
