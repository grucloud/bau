import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import radioButtonGroupStatefull from "./radioButtonGroup-statefull.ts";
// @ts-ignore
import codeExampleStatefull from "./radioButtonGroup-statefull.ts?raw";

import radioButtonGroupStateless from "./radioButtonGroup-stateless.ts";
// @ts-ignore
import codeStateless from "./radioButtonGroup-stateless.ts?raw";

import radioButtonGroupImg from "./radioButtonGroup-img.ts";
// @ts-ignore
import codeImg from "./radioButtonGroup-img.ts?raw";

import radioButtonGroupSmall from "./radioButtonGroup-small.ts";
// @ts-ignore
import codeSmall from "./radioButtonGroup-small.ts?raw";

export const radioButtonGroupSpec = {
  title: "RadioButtonGroup",
  package: "radioButtonGroup",
  description: "The radioButtonGroup component displays an input of type radio",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/radioButtonGroup/radioButtonGroup.js",
  importStatement: `import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";`,
  examples: [
    {
      title: "Stateless Radio Button Group",
      description: "A stateless radio button group.",
      code: codeStateless,
      createComponent: radioButtonGroupStateless,
    },
    {
      title: "Statefull Radio Button Group",
      description: "A statefull radio button group.",
      code: codeExampleStatefull,
      createComponent: radioButtonGroupStatefull,
    },
    {
      title: "Label with Image",
      description: "A label with an image.",
      code: codeImg,
      createComponent: radioButtonGroupImg,
    },
    {
      title: "Label with description",
      description: "A label with name and description.",
      code: codeSmall,
      createComponent: radioButtonGroupSmall,
    },
  ],
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(radioButtonGroupSpec);
};
