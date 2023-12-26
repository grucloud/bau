import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import selectGridItem from "./select-grid-item.ts";

import selectDefault from "./select-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./select-example-default.ts?raw";

import selectDefaultOption from "./select-default-option.ts";
// @ts-ignore
import codeDefaultOption from "./select-default-option.ts?raw";

import selectUrl from "./select-url.ts";
// @ts-ignore
import codeUrl from "./select-url.ts?raw";

import selectAwsRegion from "./select-aws-region.ts";
// @ts-ignore
import codeExampleAwsRegion from "./select-aws-region.ts?raw";

import selectLoading from "./select-loading.ts";
// @ts-ignore
import codeExampleLoading from "./select-loading.ts?raw";

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
      title: "Default Option",
      description: "Select with a default option",
      code: codeDefaultOption,
      createComponent: selectDefaultOption,
    },
    {
      title: "State in URL",
      description: "Select with state in URL",
      code: codeUrl,
      createComponent: selectUrl,
    },
    {
      title: "Select AWS region",
      description: "Select the AWS region",
      code: codeExampleAwsRegion,
      createComponent: selectAwsRegion,
    },
    {
      title: "Loading Indicator",
      description: "Select with a loading indicator",
      code: codeExampleLoading,
      createComponent: selectLoading,
    },
  ],
  gridItem: selectGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(selectSpec);
};
