import { Context } from "@grucloud/bau-ui/context";
import pageExample from "../pageExample.ts";

import accordionGridItem from "./accordion-grid-item.ts";

import accordionDefault from "./accordion-example-default.ts";
// @ts-ignore
import codeEx from "./accordion-example-default.ts?raw";

import accordionFitContent from "./accordion-example-fit-content.ts";
// @ts-ignore
import codeFitContent from "./accordion-example-fit-content.ts?raw";
import accordionCrossIcon from "./accordion-example-cross-icon.ts";

// @ts-ignore
import codeCrossIcon from "./accordion-example-cross-icon.ts?raw";

export const accordionSpec = {
  title: "Accordion",
  package: "accordion",
  description:
    "An accordion is a stacked list of headers that reveal or hide associated sections of content.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",
  importStatement: `import accordion from "@grucloud/bau-ui/accordion";`,
  examples: [
    {
      title: "Simple",
      description: "A simple accordion.",
      code: codeEx,
      createComponent: accordionDefault,
    },
    {
      title: "Customize with with fit-content",
      description: "Customize the width of the accordion.",
      code: codeFitContent,
      createComponent: accordionFitContent,
    },
    {
      title: "Customize the icon",
      description: "Customize the icon with a cross.",
      code: codeCrossIcon,
      createComponent: accordionCrossIcon,
    },
  ],
  gridItem: accordionGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(accordionSpec);
};
