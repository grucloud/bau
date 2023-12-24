import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import checkboxGridItem from "./checkbox-grid-item.ts";

import checkboxControlled from "./checkbox-controlled.ts";
// @ts-ignore
import codeExampleControlled from "./checkbox-controlled.ts?raw";

import checkboxUncontrolled from "./checkbox-uncontrolled.ts";
// @ts-ignore
import codeExampleUncontrolled from "./checkbox-uncontrolled.ts?raw";

import checkboxIndeterminate from "./checkbox-indeterminate.ts";
// @ts-ignore
import codeIndeterminate from "./checkbox-indeterminate.ts?raw";

import checkboxUrl from "./checkbox-url.ts";
// @ts-ignore
import codeUrl from "./checkbox-url.ts?raw";

export const checkboxSpec = {
  title: "Checkbox",
  package: "checkbox",
  description: "The checkbox component uses the native input date type.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",
  importStatement: `import checkbox from "@grucloud/bau-ui/checkbox";`,
  examples: [
    {
      title: "Uncontrolled checkbox",
      description: "An uncontrolled checkbox.",
      code: codeExampleUncontrolled,
      createComponent: checkboxUncontrolled,
    },
    {
      title: "Controlled checkbox",
      description: "A controlled checkbox.",
      code: codeExampleControlled,
      createComponent: checkboxControlled,
    },
    {
      title: "Indeterminate checkbox",
      description: "An indeterminate checkbox.",
      code: codeIndeterminate,
      createComponent: checkboxIndeterminate,
    },
    {
      title: "State in URL",
      description: "Checkbox states in URL",
      code: codeUrl,
      createComponent: checkboxUrl,
    },
  ],
  gridItem: checkboxGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(checkboxSpec);
};
