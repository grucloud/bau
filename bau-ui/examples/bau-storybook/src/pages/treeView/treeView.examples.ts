import pageExample from "../pageExample.ts";

import { Context } from "@grucloud/bau-ui/context";

import treeViewGridItem from "./treeView-grid-item.ts";

import treeViewDefault from "./treeView-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./treeView-example-default.ts?raw";

import treeViewCheck from "./treeView-check.ts";
// @ts-ignore
import codeCheck from "./treeView-check.ts?raw";

export const treeviewSpec = {
  title: "Tree View",
  package: "treeview",
  description: "A tree view displays a hierarchical list",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",
  importStatement: `import treeview from "@grucloud/bau-ui/treeview";`,
  examples: [
    {
      title: "Simple",
      description: "A simple treeview.",
      code: codeExampleDefault,
      createComponent: treeViewDefault,
    },
    {
      title: "Checkable",
      description: "A treeview with checkboxes.",
      code: codeCheck,
      createComponent: treeViewCheck,
    },
  ],
  gridItem: treeViewGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(treeviewSpec);
};
