import { Context } from "@grucloud/bau-ui/context";

import pageExample from "./pageExample.ts";

import paperGridItem from "./paper/paper-grid-item.ts";

import paperDefault from "./paper/paper-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./paper/paper-example-default.ts?raw";

export const paperSpec = {
  title: "Paper",
  package: "paper",
  description:
    "The paper component displays child components on a surface area.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",
  importStatement: `import paper from "@grucloud/bau-ui/paper";`,
  examples: [
    {
      title: "Default",
      description: "A simple paper.",
      code: codeExampleDefault,
      createComponent: paperDefault,
    },
  ],
  variantColorTableDisable: true,
  gridItem: paperGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(paperSpec);
};
