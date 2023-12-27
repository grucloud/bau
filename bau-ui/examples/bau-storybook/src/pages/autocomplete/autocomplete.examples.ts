import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";
import autocompleteGridItem from "./autocomplete-grid-item.ts";

import autocompleteDefault from "./autocomplete-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./autocomplete-example-default.ts?raw";

import autocompleteDefaultOption from "./autocomplete-default-option.ts";
// @ts-ignore
import codeDefaultOption from "./autocomplete-default-option.ts?raw";

import autocompleteLoading from "./autocomplete-loading.ts";
// @ts-ignore
import codeExampleLoading from "./autocomplete-loading.ts?raw";

import autocompleteUrl from "./autocomplete-url.ts";
// @ts-ignore
import codeUrl from "./autocomplete-url.ts?raw";

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
    {
      title: "Default Option",
      description: "A autocomplete with a default option.",
      code: codeDefaultOption,
      createComponent: autocompleteDefaultOption,
    },
    {
      title: "URL State",
      description: "A autocomplete with the state in the URL",
      code: codeUrl,
      createComponent: autocompleteUrl,
    },
  ],
  gridItem: autocompleteGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(autocompleteSpec);
};
