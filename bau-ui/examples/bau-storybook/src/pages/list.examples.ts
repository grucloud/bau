import { Context } from "@grucloud/bau-ui/context";

import pageExample from "./pageExample";

import listGridItem from "./list/list-grid-item.ts";

import listDefault from "./list/list-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./list/list-example-default.ts?raw";

export const listSpec = {
  title: "Input",
  package: "list",
  description: "The list component displays a list of items.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",
  importStatement: `import list from "@grucloud/bau-ui/list";`,
  examples: [
    {
      title: "Default",
      description: "A simple list.",
      code: codeExampleDefault,
      createComponent: listDefault,
    },
  ],
  gridItem: listGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(listSpec);
};
