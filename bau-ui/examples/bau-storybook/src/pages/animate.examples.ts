import { Context } from "@grucloud/bau-ui/context";

import pageExample from "./pageExample";

import animateDefault from "./animate/animate-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./animate/animate-example-default.ts?raw";

export const animateSpec = {
  title: "Animate",
  package: "animate",
  description: "The animate component animates a child component.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",
  importStatement: `import animate from "@grucloud/bau-ui/animate";`,
  examples: [
    {
      title: "Default",
      description: "A simple animate.",
      code: codeExampleDefault,
      createComponent: animateDefault,
    },
  ],
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(animateSpec);
};
