import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

//import popoverGridItem from "./popover/popover-grid-item.ts";

import popoverDefault from "./popover-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./popover-example-default.ts?raw";

export const popoverSpec = {
  title: "Popover",
  package: "popover",
  description: "The popover component display a dialog next to a component.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",
  importStatement: `import popover from "@grucloud/bau-ui/popover";`,
  examples: [
    {
      title: "Default",
      description: "A simple popover.",
      code: codeExampleDefault,
      createComponent: popoverDefault,
    },
  ],
  //gridItem: popoverGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(popoverSpec);
};
