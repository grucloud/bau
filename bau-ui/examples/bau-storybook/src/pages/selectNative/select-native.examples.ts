import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import selectNativeGridItem from "./select-native-grid-item.ts";

import selectNativeDefault from "./select-native-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./select-native-example-default.ts?raw";

import selectUrl from "./select-native-url.ts";
// @ts-ignore
import codeUrl from "./select-native-url.ts?raw";

// import selectNativeAwsRegion from "./select-native-aws-region.ts";
// // @ts-ignore
// import codeExampleAwsRegion from "./selectNative-aws-region.ts?raw";

export const selectNativeSpec = {
  title: "SelectNative",
  package: "selectNative",
  description:
    "The selectNative component encapsulates the native html select.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/selectNative/selectNative.js",
  importStatement: `import selectNative from "@grucloud/bau-ui/selectNative";`,
  examples: [
    {
      title: "Simple SelectNative",
      description: "A simple selectNative.",
      code: codeExampleDefault,
      createComponent: selectNativeDefault,
    },
    {
      title: "State URL",
      description: "A selectNative with state in URL",
      code: codeUrl,
      createComponent: selectUrl,
    },
  ],
  gridItem: selectNativeGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(selectNativeSpec);
};
