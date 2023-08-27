import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import checkboxGridItem from "./checkbox-grid-item.ts";

import checkboxDefault from "./checkbox-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./checkbox-example-default.ts?raw";

export const checkboxSpec = {
  title: "Checkbox",
  package: "checkbox",
  description: "The checkbox component uses the native input date type.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",
  importStatement: `import checkbox from "@grucloud/bau-ui/checkbox";`,
  examples: [
    {
      title: "Default",
      description: "A simple checkbox.",
      code: codeExampleDefault,
      createComponent: checkboxDefault,
    },
  ],
  gridItem: checkboxGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(checkboxSpec);
};
