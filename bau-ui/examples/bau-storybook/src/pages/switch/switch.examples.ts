import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import switchGridItem from "./switch-grid-item.ts";

import switchUncontrolled from "./switch-uncontrolled.ts";
// @ts-ignore
import codeUncontrolled from "./switch-uncontrolled.ts?raw";

import switchControlled from "./switch-controlled.ts";
// @ts-ignore
import codeControlled from "./switch-controlled.ts?raw";

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
      title: "Uncontrolled Switch",
      description: "A uncontrolled switch.",
      code: codeUncontrolled,
      createComponent: switchUncontrolled,
    },
    {
      title: "Controlled Switch",
      description: "A controlled switch.",
      code: codeControlled,
      createComponent: switchControlled,
    },
  ],
  gridItem: switchGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(switchSpec);
};
