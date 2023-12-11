import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import keyValueListDefault from "./keyValueList-vertical.ts";
// @ts-ignore
import codeExampleDefault from "./keyValueList-vertical.ts?raw";

import keyValueListHorizontal from "./keyValueList-horizontal.ts";
// @ts-ignore
import codeExampleHorizontal from "./keyValueList-horizontal.ts?raw";

export const keyValueListSpec = {
  title: "KeyValueList",
  package: "keyValueList",
  description: "The keyValueList component displays a list of key value pair",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/keyValueList/keyValueList.js",
  importStatement: `import keyValueList from "@grucloud/bau-ui/keyValueList";`,
  examples: [
    {
      title: "Vertical keyValueList",
      description: "A vertical keyValueList.",
      code: codeExampleDefault,
      createComponent: keyValueListDefault,
    },
    {
      title: "Horizontal keyValueList",
      description: "A horizontal keyValueList.",
      code: codeExampleHorizontal,
      createComponent: keyValueListHorizontal,
    },
  ],
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(keyValueListSpec);
};
