import { Context } from "@grucloud/bau-ui/context";

import pageExample from "./pageExample";

import buttonGroupGridItem from "./buttonGroup/buttonGroup-grid-item.ts";

import buttonGroupDefault from "./buttonGroup/buttonGroup-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./buttonGroup/buttonGroup-example-default.ts?raw";

export const buttonGroupSpec = {
  title: "Button",
  package: "buttonGroup",
  description: "The buttonGroup component groups button together.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",
  importStatement: `import buttonGroup from "@grucloud/bau-ui/buttonGroup";`,
  examples: [
    {
      title: "Default",
      description: "A simple buttonGroup.",
      code: codeExampleDefault,
      createComponent: buttonGroupDefault,
    },
  ],
  gridItem: buttonGroupGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(buttonGroupSpec);
};
