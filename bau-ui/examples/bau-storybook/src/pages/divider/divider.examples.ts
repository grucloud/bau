import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

//import dividerGridItem from "./divider-grid-item.ts";

import dividerDefault from "./divider-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./divider-example-default.ts?raw";

export const dividerSpec = {
  title: "Divider",
  package: "divider",
  description: "The divider component is a separator between components",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/divider/divider.js",
  importStatement: `import divider from "@grucloud/bau-ui/divider";`,
  examples: [
    {
      title: "Simple Divider",
      description: "A simple divider.",
      code: codeExampleDefault,
      createComponent: dividerDefault,
    },
  ],
  variantColorTableDisable: true,
  variantSizeDisable: true,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(dividerSpec);
};
