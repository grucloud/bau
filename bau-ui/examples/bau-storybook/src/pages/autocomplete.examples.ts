import { Context } from "@grucloud/bau-ui/context";

import pageExample from "./pageExample";
import autocompleteGridItem from "./autocomplete/autocomplete-grid-item.ts";

import autocompleteDefault from "./autocomplete/autocomplete-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./autocomplete/autocomplete-example-default.ts?raw";

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
      title: "Default",
      description: "A simple autocomplete.",
      code: codeExampleDefault,
      createComponent: autocompleteDefault,
    },
  ],
  gridItem: autocompleteGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(autocompleteSpec);
};
