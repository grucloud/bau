import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import tooltipGridItem from "./tooltip-grid-item.ts";

import tooltipDefault from "./tooltip-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./tooltip-example-default.ts?raw";

import tooltipGrid from "./tooltip-example-grid.ts";
// @ts-ignore
import codeExampleGrid from "./tooltip-example-grid.ts?raw";

export const tooltipSpec = {
  title: "Tooltip",
  package: "tooltip",
  description: "The tooltip display information next to a component.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",
  importStatement: `import tooltip from "@grucloud/bau-ui/tooltip";`,
  examples: [
    {
      title: "Default",
      description: "A simple tooltip.",
      code: codeExampleDefault,
      createComponent: tooltipDefault,
    },
    {
      title: "Grid",
      description: "Various tooltip position",
      code: codeExampleGrid,
      createComponent: tooltipGrid,
    },
  ],
  gridItem: tooltipGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(tooltipSpec);
};
