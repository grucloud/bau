import { Context } from "@grucloud/bau-ui/context";

import pageExample from "./pageExample";

import alertStackDefault from "./alertStack/alertStack-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./alertStack/alertStack-example-default.ts?raw";

export const alertStackSpec = {
  title: "Alert Stack",
  package: "alertStack",
  description:
    "An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",
  importStatement: `import alertStack from "@grucloud/bau-ui/alertStack";`,
  examples: [
    {
      title: "Default",
      description: "A simple alertStack.",
      code: codeExampleDefault,
      createComponent: alertStackDefault,
    },
  ],
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(alertStackSpec);
};
