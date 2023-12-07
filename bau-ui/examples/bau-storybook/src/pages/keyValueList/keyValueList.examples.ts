import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import keyValueListDefault from "./keyValueList-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./keyValueList-example-default.ts?raw";

export const keyValueListSpec = {
  title: "KeyValueList",
  package: "keyValueList",
  description: "The keyValueList component displays a list of key value pair",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/keyValueList/keyValueList.js",
  importStatement: `import keyValueList from "@grucloud/bau-ui/keyValueList";`,
  examples: [
    {
      title: "Simple",
      description: "A simple keyValueList.",
      code: codeExampleDefault,
      createComponent: keyValueListDefault,
    },
  ],
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(keyValueListSpec);
};
