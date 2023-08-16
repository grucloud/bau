import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
import { Context } from "@grucloud/bau-ui/context";
import pageExample from "./pageExample";

import accordionGridItem from "./accordion/accordion-grid-item.ts";

import accordionDefault from "./accordion/accordion-example-default.ts";
// @ts-ignore
import codeEx from "./accordion/accordion-example-default.ts?raw";

import accordionFitContent from "./accordion/accordion-example-fit-content.ts";
// @ts-ignore
import codeFitContent from "./accordion/accordion-example-fit-content.ts?raw";
import accordionCrossIcon from "./accordion/accordion-example-cross-icon.ts";

// @ts-ignore
import codeCrossIcon from "./accordion/accordion-example-cross-icon.ts?raw";

const createAccordionDefs = (context: Context): Accordion[] => {
  const { bau } = context;
  const { div, p } = bau.tags;

  const accordionDefs: Accordion[] = [
    {
      name: "Item1",
      Header: () => "Item 1",
      Content: () => div(p("Item 1 Content")),
    },
    {
      name: "Item2",
      Header: () => "Item 2",
      Content: () => div(p("Item 2 Content")),
    },
    {
      name: "Item3",
      Header: () => "Item 3",
      Content: () => div(p("Item 3 content")),
    },
  ];
  return accordionDefs;
};

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
      title: "Default ",
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
