import alert from "@grucloud/bau-ui/alert";
import { Context } from "@grucloud/bau-ui/context";

import pageExample from "./pageExample";

import alertGridItem from "./alert/alert-grid-item.ts";

import alertDefault from "./alert/alert-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./alert/alert-example-default.ts?raw";

import alertCustom from "./alert/alert-example-custom.ts";
// @ts-ignore
import codeExampleCustom from "./alert/alert-example-custom.ts?raw";

export const alertSpec = {
  title: "Alert",
  package: "alert",
  description:
    "An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",
  importStatement: `import alert from "@grucloud/bau-ui/alert";`,
  examples: [
    {
      title: "Default",
      description: "A simple danger alert.",
      code: codeExampleDefault,
      createComponent: alertDefault,
    },
    {
      title: "Custom Alert ",
      description: "A custom alert.",
      code: codeExampleCustom,
      createComponent: alertCustom,
    },
  ],
  gridItem: alertGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(alertSpec);
};
