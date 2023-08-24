import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

//import paginationNavigationGridItem from "./paginationNavigation-grid-item.ts";

import paginationNavigationDefault from "./paginationNavigation-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./paginationNavigation-example-default.ts?raw";

export const paginationNavigationSpec = {
  title: "Pagination Navigation",
  package: "paginationNavigation",
  description:
    "The paginationNavigation component displays a previous and a next button for navigation",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",
  importStatement: `import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";`,
  examples: [
    {
      title: "Simple PaginationNavigation",
      description: "A simple paginationNavigation.",
      code: codeExampleDefault,
      createComponent: paginationNavigationDefault,
    },
  ],
  //gridItem: paginationNavigationGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(paginationNavigationSpec);
};
