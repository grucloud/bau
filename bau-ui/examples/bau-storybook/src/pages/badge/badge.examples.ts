import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import badgeGridItem from "./badge-grid-item.ts";

import badgeDefault from "./badge-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./badge-example-default.ts?raw";

export const badgeSpec = {
  title: "Badge",
  package: "badge",
  description:
    "The badge component displays a number on the top right corner of an icon",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",
  importStatement: `import badge from "@grucloud/bau-ui/badge";`,
  examples: [
    {
      title: "Default",
      description: "A simple badge.",
      code: codeExampleDefault,
      createComponent: badgeDefault,
    },
  ],
  gridItem: badgeGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(badgeSpec);
};
