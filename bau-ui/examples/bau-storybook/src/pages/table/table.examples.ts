import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

//import tableGridItem from "./table/table-grid-item.ts";

import tableDefault from "./table-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./table-example-default.ts?raw";

import tableDense from "./table-example-dense.ts";
// @ts-ignore
import codeExampleDense from "./table-example-dense.ts?raw";

import tableZebra from "./table-example-zebra.ts";
// @ts-ignore
import codeExampleZebra from "./table-example-zebra.ts?raw";

export const tableSpec = {
  title: "Table",
  package: "table",
  description: "The table container component styles an HTML table.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",
  importStatement: `import tableContainer from "@grucloud/bau-ui/tableContainer";`,
  examples: [
    {
      title: "Default",
      description: "A simple table.",
      code: codeExampleDefault,
      createComponent: tableDefault,
    },
    {
      title: "Dense",
      description: "A dense table.",
      code: codeExampleDense,
      createComponent: tableDense,
    },
    {
      title: "Zebra",
      description: "A zebra table.",
      code: codeExampleZebra,
      createComponent: tableZebra,
    },
  ],
  //gridItem: tableGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(tableSpec);
};
