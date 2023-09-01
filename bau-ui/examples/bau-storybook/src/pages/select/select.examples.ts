import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import selectGridItem from "./select-grid-item.ts";

import selectDefault from "./select-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./select-example-default.ts?raw";

import selectAwsRegion from "./select-aws-region.ts";
// @ts-ignore
import codeExampleAwsRegion from "./select-aws-region.ts?raw";

export const selectSpec = {
  title: "Select",
  package: "select",
  description: "The select component allows user to select from a list.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",
  importStatement: `import select from "@grucloud/bau-ui/select";`,
  examples: [
    {
      title: "Simple Select",
      description: "A simple select.",
      code: codeExampleDefault,
      createComponent: selectDefault,
    },
    {
      title: "Select AWS region",
      description: "Select the AWS region",
      code: codeExampleAwsRegion,
      createComponent: selectAwsRegion,
    },
  ],
  gridItem: selectGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(selectSpec);
};
