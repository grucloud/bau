import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import breadcrumbsGridItem from "./breadcrumbs-grid-item.ts";

import breadcrumbsDefault from "./breadcrumbs-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./breadcrumbs-example-default.ts?raw";

import breadcrumbsSeparator from "./breadcrumbs-separator.ts";
// @ts-ignore
import codeExampleSeparator from "./breadcrumbs-separator.ts?raw";

export const breadcrumbsSpec = {
  title: "Breadcrumbs",
  package: "breadcrumbs",
  description:
    "The breadcrumbs component is an horizonal bar for navigation between pages",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",
  importStatement: `import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";`,
  examples: [
    {
      title: "Default",
      description: "A simple breadcrumbs.",
      code: codeExampleDefault,
      createComponent: breadcrumbsDefault,
    },
    {
      title: "Separator",
      description: "A breadcrumbs with a custom separator.",
      code: codeExampleSeparator,
      createComponent: breadcrumbsSeparator,
    },
  ],
  gridItem: breadcrumbsGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(breadcrumbsSpec);
};
