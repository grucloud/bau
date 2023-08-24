import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import radioButtonGridItem from "./radioButton-grid-item.ts";

import radioButtonDefault from "./radioButton-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./radioButton-example-default.ts?raw";

export const radioButtonSpec = {
  title: "RadioButton",
  package: "radioButton",
  description: "The radioButton component displays an input of type radio",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",
  importStatement: `import radioButton from "@grucloud/bau-ui/radioButton";`,
  examples: [
    {
      title: "Simple RadioButton",
      description: "A simple radioButton.",
      code: codeExampleDefault,
      createComponent: radioButtonDefault,
    },
  ],
  gridItem: radioButtonGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(radioButtonSpec);
};
