import { Context } from "@grucloud/bau-ui/context";

import pageExample from "./pageExample";

import tabsGridItem from "./tabs/tabs-grid-item.ts";

import tabsDefault from "./tabs/tabs-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./tabs/tabs-example-default.ts?raw";

import tabsExtended from "./tabs/tabs-example-extended.ts";
// @ts-ignore
import codeExampleExtended from "./tabs/tabs-example-extended.ts?raw";

import tabsBottomHeader from "./tabs/tabs-example-bottom-header.ts";
// @ts-ignore
import codeExampleBottomHeader from "./tabs/tabs-example-bottom-header.ts?raw";

import tabsCentered from "./tabs/tabs-example-centered.ts";
// @ts-ignore
import codeExampleCentered from "./tabs/tabs-example-centered.ts?raw";

export const tabsSpec = {
  title: "Tabs",
  package: "tabs",
  description:
    "The tabs component displays multiple content and a header for navigation.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",
  importStatement: `import tabs from "@grucloud/bau-ui/tabs";`,
  examples: [
    {
      title: "Default",
      description: "A simple tabs.",
      code: codeExampleDefault,
      createComponent: tabsDefault,
    },
    {
      title: "Extended Tabs",
      description: "An extended tabs.",
      code: codeExampleExtended,
      createComponent: tabsExtended,
    },
    {
      title: "Bottom Header Tabs",
      description: "Tabs where the header is at the bottom of the content.",
      code: codeExampleBottomHeader,
      createComponent: tabsBottomHeader,
    },
    {
      title: "Centered Header Tabs",
      description: "Tabs where the headers are centered.",
      code: codeExampleCentered,
      createComponent: tabsCentered,
    },
  ],
  gridItem: tabsGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(tabsSpec);
};
