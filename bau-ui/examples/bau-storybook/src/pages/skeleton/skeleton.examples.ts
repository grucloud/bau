import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

//import skeletonGridItem from "./skeleton-grid-item.ts";

import skeletonDefault from "./skeleton-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./skeleton-example-default.ts?raw";

import skeletonList from "./skeleton-example-list.ts";
// @ts-ignore
import codeExampleList from "./skeleton-example-list.ts?raw";

import skeletonTable from "./skeleton-example-table.ts";
// @ts-ignore
import codeExampleTable from "./skeleton-example-table.ts?raw";

import skeletonTabs from "./skeleton-example-tabs.ts";
// @ts-ignore
import codeExampleTabs from "./skeleton-example-tabs.ts?raw";

export const skeletonSpec = {
  title: "Skeleton",
  package: "skeleton",
  description: "The skeleton component is used a loading indicator",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/skeleton/skeleton.js",
  importStatement: `import skeleton from "@grucloud/bau-ui/skeleton";`,
  examples: [
    {
      title: "Card",
      description: "A card skeleton.",
      code: codeExampleDefault,
      createComponent: skeletonDefault,
    },
    {
      title: "List",
      description: "A list skeleton.",
      code: codeExampleList,
      createComponent: skeletonList,
    },
    {
      title: "Table",
      description: "A table skeleton.",
      code: codeExampleTable,
      createComponent: skeletonTable,
    },
    {
      title: "Tabs",
      description: "A tabs skeleton.",
      code: codeExampleTabs,
      createComponent: skeletonTabs,
    },
  ],
  variantColorTableDisable: true,
  variantSizeDisable: true,

  //gridItem: skeletonGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(skeletonSpec);
};
