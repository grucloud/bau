import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import inputSearchGridItem from "./inputSearch-grid-item.ts";

import inputSearchDefault from "./inputSearch-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./inputSearch-example-default.ts?raw";

export const inputSearchSpec = {
  title: "Input Search",
  package: "inputSearch",
  description:
    "The inputSearch component is an input of type 'search' with an icon on the left hand side.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/inputSearch/inputSearch.js",
  importStatement: `import inputSearch from "@grucloud/bau-ui/inputSearch";`,
  examples: [
    {
      title: "Basic",
      description: "A simple inputSearch.",
      code: codeExampleDefault,
      createComponent: inputSearchDefault,
    },
  ],
  gridItem: inputSearchGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(inputSearchSpec);
};
