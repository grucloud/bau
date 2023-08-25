import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import chipGridItem from "./chip-grid-item.ts";

import chipDefault from "./chip-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./chip-example-default.ts?raw";

export const chipSpec = {
  title: "Chip",
  package: "chip",
  description:
    "The chip component displays text that needs to stand out and get noticed. ",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",
  importStatement: `import chip from "@grucloud/bau-ui/chip";`,
  examples: [
    {
      title: "Default",
      description: "A simple chip.",
      code: codeExampleDefault,
      createComponent: chipDefault,
    },
  ],
  gridItem: chipGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(chipSpec);
};
