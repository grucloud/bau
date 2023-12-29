import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import toggleGridItem from "./toggle-grid-item.ts";

import toggleControlled from "./toggle-controlled.ts";
// @ts-ignore
import codeControlled from "./toggle-controlled.ts?raw";

import toggleUncontrolled from "./toggle-uncontrolled.ts";
// @ts-ignore
import codeUncontrolled from "./toggle-uncontrolled.ts?raw";

import toggleUrl from "./toggle-url.ts";
// @ts-ignore
import codeUrl from "./toggle-url.ts?raw";

export const toggleSpec = {
  title: "Toggle",
  package: "toggle",
  description: "The toggle component displays a button with 2 states",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",
  importStatement: `import toggle from "@grucloud/bau-ui/toggle";`,
  examples: [
    {
      title: "Controlled Toggle",
      description: "A controlled toggle.",
      code: codeControlled,
      createComponent: toggleControlled,
    },
    {
      title: "Uncontrolled Toggle",
      description: "A uncontrolled toggle.",
      code: codeUncontrolled,
      createComponent: toggleUncontrolled,
    },
    {
      title: "State in URL",
      description: "Toggle with state stored in the URL.",
      code: codeUrl,
      createComponent: toggleUrl,
    },
  ],
  gridItem: toggleGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(toggleSpec);
};
