import pageExample from "./pageExample";

import { Context } from "@grucloud/bau-ui/context";

import treeViewGridItem from "./treeView/treeView-grid-item.ts";

import treeViewDefault from "./treeView/treeView-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./treeView/treeView-example-default.ts?raw";

export const treeviewSpec = {
  title: "Tree View",
  package: "treeview",
  description: "A tree view displays a hierarchical list",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",
  importStatement: `import treeview from "@grucloud/bau-ui/treeview";`,
  examples: [
    {
      title: "Default",
      description: "A simple treeview.",
      code: codeExampleDefault,
      createComponent: treeViewDefault,
    },
  ],
  gridItem: treeViewGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(treeviewSpec);
};
