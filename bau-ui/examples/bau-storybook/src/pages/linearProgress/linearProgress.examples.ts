import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import linearProgressGridItem from "./linearProgress-grid-item.ts";

import linearProgressDefault from "./linearProgress-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./linearProgress-example-default.ts?raw";

export const linearProgressSpec = {
  title: "LinearProgress",
  package: "linearProgress",
  description:
    "The linearProgress component displays an animated horizontal bar.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",
  importStatement: `import linearProgress from "@grucloud/bau-ui/linearProgress";`,
  examples: [
    {
      title: "Simple LinearProgress",
      description: "A simple linearProgress.",
      code: codeExampleDefault,
      createComponent: linearProgressDefault,
    },
  ],
  gridItem: linearProgressGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(linearProgressSpec);
};
