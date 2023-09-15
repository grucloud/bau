import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";
import autocompleteGridItem from "./autocomplete-grid-item.ts";

import autocompleteDefault from "./autocomplete-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./autocomplete-example-default.ts?raw";

import autocompleteLoading from "./autocomplete-loading.ts";
// @ts-ignore
import codeExampleLoading from "./autocomplete-loading.ts?raw";
export const autocompleteSpec = {
  title: "Auto Complete",
  package: "autocomplete",
  description:
    "An autocomplete allows to search and select an item from a list.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",
  importStatement: `import autocomplete from "@grucloud/bau-ui/autocomplete";`,
  examples: [
    {
      title: "Basic",
      description: "A simple autocomplete.",
      code: codeExampleDefault,
      createComponent: autocompleteDefault,
    },
    {
      title: "Loading Indicator",
      description: "A autocomplete with a loading indicator.",
      code: codeExampleLoading,
      createComponent: autocompleteLoading,
    },
  ],
  gridItem: autocompleteGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(autocompleteSpec);
};
