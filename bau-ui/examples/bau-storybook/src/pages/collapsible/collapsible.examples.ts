import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import collapsibleGridItem from "./collapsible-grid-item.ts";

import collapsibleDefault from "./collapsible-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./collapsible-example-default.ts?raw";

export const collapsibleSpec = {
  title: "Collapsible",
  package: "collapsible",
  description:
    "The collapsible component expands and collapse a list of elements.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",
  importStatement: `import collapsible from "@grucloud/bau-ui/collapsible";`,
  examples: [
    {
      title: "Simple Collapsible",
      description: "A simple collapsible displaying a few random pictures.",
      code: codeExampleDefault,
      createComponent: collapsibleDefault,
    },
  ],
  gridItem: collapsibleGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(collapsibleSpec);
};
