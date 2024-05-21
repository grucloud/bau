import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import toggleGroupGridItem from "./toggleGroup-grid-item.ts";

import toggleGroupExclusive from "./toggleGroup-exclusive.ts";
// @ts-ignore
import codeExampleExclusive from "./toggleGroup-exclusive.ts?raw";

import toggleGroupInclusive from "./toggleGroup-inclusive.ts";
// @ts-ignore
import codeExampleInclusive from "./toggleGroup-inclusive.ts?raw";

import toggleGroupUrl from "./toggleGroup-url.ts";
// @ts-ignore
import codeExampleUrl from "./toggleGroup-url.ts?raw";

export const toggleGroupSpec = {
  title: "Toggle Group",
  package: "toggleGroup",
  description: "The toggleGroup component displays a set of toogle button",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",
  importStatement: `import toggleGroup from "@grucloud/bau-ui/toggleGroup";`,
  examples: [
    {
      title: "Exclusive ToggleGroup",
      description: "A simple exclusive toggleGroup.",
      code: codeExampleExclusive,
      createComponent: toggleGroupExclusive,
    },
    {
      title: "Inclusive ToggleGroup",
      description: "A simple inclusive toggleGroup.",
      code: codeExampleInclusive,
      createComponent: toggleGroupInclusive,
    },
    {
      title: "State in URL",
      description: "A toggleGroup with state in the URL.",
      code: codeExampleUrl,
      createComponent: toggleGroupUrl,
    },
  ],
  gridItem: toggleGroupGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(toggleGroupSpec);
};
