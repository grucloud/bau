import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import modalGridItem from "./modal-grid-item.ts";

import modalDefault from "./modal-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./modal-example-default.ts?raw";

export const modalSpec = {
  title: "Modal",
  package: "modal",
  description:
    "The modal component is a wrapper around the native dialog element.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",
  importStatement: `import modal from "@grucloud/bau-ui/modal";`,
  examples: [
    {
      title: "Default",
      description: "A simple modal.",
      code: codeExampleDefault,
      createComponent: modalDefault,
    },
  ],
  gridItem: modalGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(modalSpec);
};
