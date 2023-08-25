import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

//import drawerGridItem from "./drawer/drawer-grid-item.ts";

import drawerDefault from "./drawer-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./drawer-example-default.ts?raw";

export const drawerSpec = {
  title: "DrilldownMenu",
  package: "drawer",
  description: "The drawer show and hide a menu.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",
  importStatement: `import drawer from "@grucloud/bau-ui/drawer";`,
  examples: [
    {
      title: "Default",
      description: "A simple drawer.",
      code: codeExampleDefault,
      createComponent: drawerDefault,
    },
  ],
  // gridItem: drawerGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(drawerSpec);
};
