import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

//import multiSelectGridItem from "./multiSelect-grid-item.ts";

import multiSelectDefault from "./multiSelect-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./multiSelect-example-default.ts?raw";

import multiSelectNative from "./multiSelect-native.ts";
// @ts-ignore
import codeExampleNative from "./multiSelect-native.ts?raw";

export const multiSelectSpec = {
  title: "MultiSelect",
  package: "multiSelect",
  description:
    "The multiSelect component allows user to select multiple items from a list.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/multiSelect/multiSelect.js",
  importStatement: `import multiSelect from "@grucloud/bau-ui/multiSelect";`,
  examples: [
    {
      title: "Simple Multi Select",
      description: "A simple multi select.",
      code: codeExampleDefault,
      createComponent: multiSelectDefault,
    },
    {
      title: "Native Multi Select",
      description: "A native multi select.",
      code: codeExampleNative,
      createComponent: multiSelectNative,
    },
  ],
  //gridItem: multiSelectGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(multiSelectSpec);
};
