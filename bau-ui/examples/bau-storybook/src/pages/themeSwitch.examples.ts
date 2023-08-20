import { Context } from "@grucloud/bau-ui/context";

import pageExample from "./pageExample";

import themeSwitchGridItem from "./themeSwitch/themeSwitch-grid-item.ts";

import themeSwitchDefault from "./themeSwitch/themeSwitch-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./themeSwitch/themeSwitch-example-default.ts?raw";

export const themeSwitchSpec = {
  title: "Theme Switch",
  package: "themeSwitch",
  description:
    "The themeSwitch component allows a user to switch between light and dark theme.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",
  importStatement: `import createSwitch from "@grucloud/bau-ui/themeSwitch";`,
  examples: [
    {
      title: "Default",
      description: "A simple themeSwitch.",
      code: codeExampleDefault,
      createComponent: themeSwitchDefault,
    },
  ],
  gridItem: themeSwitchGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(themeSwitchSpec);
};
