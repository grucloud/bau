import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import inputGridItem from "./input-grid-item.ts";

import inputUncontrolled from "./input-uncontrolled.ts";
// @ts-ignore
import codeUncontrolled from "./input-uncontrolled.ts?raw";

import inputControlled from "./input-controlled.ts";
// @ts-ignore
import codeControlled from "./input-controlled.ts?raw";

export const inputSpec = {
  title: "Input",
  package: "input",
  description: "The input component allows user to enter text.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",
  importStatement: `import input from "@grucloud/bau-ui/input";`,
  examples: [
    {
      title: "Uncontrolled Input",
      description: "Various uncontrolled inputs.",
      code: codeUncontrolled,
      createComponent: inputUncontrolled,
    },
    {
      title: "Controlled Input",
      description: "Various controlled inputs.",
      code: codeControlled,
      createComponent: inputControlled,
    },
  ],
  gridItem: inputGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(inputSpec);
};
