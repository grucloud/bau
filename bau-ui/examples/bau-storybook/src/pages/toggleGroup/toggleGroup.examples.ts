import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import toggleGroupGridItem from "./toggleGroup-grid-item.ts";

import toggleGroupDefault from "./toggleGroup-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./toggleGroup-example-default.ts?raw";

import toggleGroupInclusive from "./toggleGroup-inclusive.ts";
// @ts-ignore
import codeExampleInclusive from "./toggleGroup-inclusive.ts?raw";

export const toggleGroupSpec = {
  title: "Toggle Group",
  package: "toggleGroup",
  description: "The toggleGroup component displays a set of toogle button",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",
  importStatement: `import toggleGroup from "@grucloud/bau-ui/toggleGroup";`,
  examples: [
    {
      title: "Exclusive ToggleGroup",
      description: "A simple exclusive toggleGroup.",
      code: codeExampleDefault,
      createComponent: toggleGroupDefault,
    },
    {
      title: "Inclusive ToggleGroup",
      description: "A simple inclusive toggleGroup.",
      code: codeExampleInclusive,
      createComponent: toggleGroupInclusive,
    },
  ],
  gridItem: toggleGroupGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(toggleGroupSpec);
};
