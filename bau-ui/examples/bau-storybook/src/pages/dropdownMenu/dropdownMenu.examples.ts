import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import dropdownMenuGridItem from "./dropdownMenu-grid-item.ts";

import dropdownMenuDefault from "./dropdownMenu-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./dropdownMenu-example-default.ts?raw";

export const dropdownMenuSpec = {
  title: "Dropdown Menu",
  package: "dropdownMenu",
  description: "The dropdown menu shows a menu when a button is clicked.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/dropdownMenu/dropdownMenu.js",
  importStatement: `import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";`,
  examples: [
    {
      title: "Simple Dropdown Menu",
      description: "A simple dropdown menu.",
      code: codeExampleDefault,
      createComponent: dropdownMenuDefault,
    },
  ],
  gridItem: dropdownMenuGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(dropdownMenuSpec);
};
