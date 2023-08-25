import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import selectGridItem from "./select-grid-item.ts";

import selectDefault from "./select-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./select-example-default.ts?raw";

export const selectSpec = {
  title: "Modal",
  package: "select",
  description: "The select component allows user to select from a list.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",
  importStatement: `import select from "@grucloud/bau-ui/select";`,
  examples: [
    {
      title: "Default",
      description: "A simple select.",
      code: codeExampleDefault,
      createComponent: selectDefault,
    },
  ],
  gridItem: selectGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(selectSpec);
};
