import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

//import stepperGridItem from "./stepper-grid-item.ts";

import stepperDefault from "./stepper-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./stepper-example-default.ts?raw";

import stepperCloudConfig from "./stepper-cloud-config.ts";
// @ts-ignore
import codeExampleCloudConfig from "./stepper-cloud-config.ts?raw";

export const stepperSpec = {
  title: "Stepper",
  package: "stepper",
  description:
    "The stepper component displays a series of screens that are accessed one after the other.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/stepper/stepper.js",
  importStatement: `import stepper from "@grucloud/bau-ui/stepper";`,
  examples: [
    {
      title: "Simple Stepper",
      description: "A simple stepper.",
      code: codeExampleDefault,
      createComponent: stepperDefault,
    },
    {
      title: "Cloud Config Stepper",
      description: "Configure cloud provider",
      code: codeExampleCloudConfig,
      createComponent: stepperCloudConfig,
    },
  ],
  //gridItem: stepperGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(stepperSpec);
};
