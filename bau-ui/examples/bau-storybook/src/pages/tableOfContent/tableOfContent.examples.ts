import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

//import tableOfContentGridItem from "./tableOfContent-grid-item.ts";

import tableOfContentDefault from "./tableOfContent-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./tableOfContent-example-default.ts?raw";

export const tableOfContentSpec = {
  title: "TableOfContent",
  package: "tableOfContent",
  description: "The tableOfContent component displays a table of content",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",
  importStatement: `import tableOfContent from "@grucloud/bau-ui/tableOfContent";`,
  examples: [
    {
      title: "Simple TableOfContent",
      description: "A simple tableOfContent.",
      code: codeExampleDefault,
      createComponent: tableOfContentDefault,
    },
  ],
  //gridItem: tableOfContentGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(tableOfContentSpec);
};
