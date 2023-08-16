import { Context } from "@grucloud/bau-ui/context";

import pageExample from "./pageExample";

import inputGridItem from "./input/input-grid-item.ts";

import inputDefault from "./input/input-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./input/input-example-default.ts?raw";

export const inputSpec = {
  title: "Input",
  package: "input",
  description: "The input component allows user to enter text.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",
  importStatement: `import input from "@grucloud/bau-ui/input";`,
  examples: [
    {
      title: "Default",
      description: "A simple input.",
      code: codeExampleDefault,
      createComponent: inputDefault,
    },
  ],
  gridItem: inputGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(inputSpec);
};
