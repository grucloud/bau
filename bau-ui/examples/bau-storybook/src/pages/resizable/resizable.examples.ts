import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import resizableHorizontal1 from "./resizable-horizontal-1.ts";
// @ts-ignore
import codeHorizontal1 from "./resizable-horizontal-1.ts?raw";

import resizableHorizontal2 from "./resizable-horizontal-2.ts";
// @ts-ignore
import codeHorizontal2 from "./resizable-horizontal-2.ts?raw";

import resizableVertical2 from "./resizable-vertical-2.ts";
// @ts-ignore
import codeVertical2 from "./resizable-vertical-2.ts?raw";

import resizableNested from "./resizable-nested.ts";
// @ts-ignore
import codeNested from "./resizable-nested.ts?raw";

export const resizableSpec = {
  title: "Resizable",
  package: "resizable",
  description: "The resizable component allows to resize panels",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/resizable/resizable.js",
  importStatement: `import resizable from "@grucloud/bau-ui/resizable";`,
  examples: [
    {
      title: "Horizontal 1 Panel",
      description: "A resizable horizontal panel.",
      code: codeHorizontal1,
      createComponent: resizableHorizontal1,
    },
    {
      title: "Horizontal 2 Panels",
      description: "A resizable 2 side horizontal panel.",
      code: codeHorizontal2,
      createComponent: resizableHorizontal2,
    },
    {
      title: "Vertical 2 Panels",
      description: "A resizable 2 side vertical panel.",
      code: codeVertical2,
      createComponent: resizableVertical2,
    },
    {
      title: "Nested",
      description: "Nested panels.",
      code: codeNested,
      createComponent: resizableNested,
    },
  ],
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(resizableSpec);
};
