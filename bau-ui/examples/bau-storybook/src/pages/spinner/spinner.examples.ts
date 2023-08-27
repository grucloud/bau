import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import spinnerGridItem from "./spinner-grid-item.ts";

import spinnerDefault from "./spinner-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./spinner-example-default.ts?raw";

export const spinnerSpec = {
  title: "Spinner",
  package: "spinner",
  description: "The spinner component displays an animated loading spinner.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",
  importStatement: `import spinner from "@grucloud/bau-ui/spinner";`,
  examples: [
    {
      title: "Default",
      description: "A simple spinner.",
      code: codeExampleDefault,
      createComponent: spinnerDefault,
    },
  ],
  gridItem: spinnerGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(spinnerSpec);
};
