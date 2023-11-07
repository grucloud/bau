import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import checkboxGridItem from "./checkbox-grid-item.ts";

import checkboxDefault from "./checkbox-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./checkbox-example-default.ts?raw";

import checkboxUncontrolled from "./checkbox-uncontrolled.ts";
// @ts-ignore
import codeExampleUncontrolled from "./checkbox-uncontrolled.ts?raw";

export const checkboxSpec = {
  title: "Checkbox",
  package: "checkbox",
  description: "The checkbox component uses the native input date type.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",
  importStatement: `import checkbox from "@grucloud/bau-ui/checkbox";`,
  examples: [
    {
      title: "Controlled checkbox",
      description: "A controlled checkbox.",
      code: codeExampleDefault,
      createComponent: checkboxDefault,
    },
    {
      title: "Uncontrolled checkbox",
      description: "An uncontrolled checkbox.",
      code: codeExampleUncontrolled,
      createComponent: checkboxUncontrolled,
    },
  ],
  gridItem: checkboxGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(checkboxSpec);
};
