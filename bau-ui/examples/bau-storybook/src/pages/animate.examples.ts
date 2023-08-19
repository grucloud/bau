import { Context } from "@grucloud/bau-ui/context";

import pageExample from "./pageExample";

import animateDefault from "./animate/animate-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./animate/animate-example-default.ts?raw";

//import animateDisplayNone from "./animate/animate-visibility-hidden.ts";
// @ts-ignore
//import codeExampleDisplayNone from "./animate/animate-visibility-hidden.ts?raw";

export const animateSpec = {
  title: "Animate",
  package: "animate",
  description: "The animate component animates a child component.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",
  importStatement: `import animate from "@grucloud/bau-ui/animate";`,
  examples: [
    {
      title: "Basic Example",
      description: "A simple animation example.",
      code: codeExampleDefault,
      createComponent: animateDefault,
    },
    // {
    //   title: "visibility: hidden",
    //   description: "Hide and show with visibility: hidden",
    //   code: codeExampleDisplayNone,
    //   createComponent: animateDisplayNone,
    // },
  ],
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(animateSpec);
};
