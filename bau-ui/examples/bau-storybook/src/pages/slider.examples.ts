import { Context } from "@grucloud/bau-ui/context";

import pageExample from "./pageExample";

import sliderGridItem from "./slider/slider-grid-item.ts";

import sliderDefault from "./slider/slider-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./slider/slider-example-default.ts?raw";

import sliderMark from "./slider/slider-example-mark.ts";
// @ts-ignore
import codeExampleMark from "./slider/slider-example-mark.ts?raw";

import sliderVertical from "./slider/slider-example-vertical.ts";
// @ts-ignore
import codeExampleVertical from "./slider/slider-example-vertical.ts?raw";

export const sliderSpec = {
  title: "Slide",
  package: "slider",
  description:
    "The slider component allows a user to to choose a number between a range.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",
  importStatement: `import slider from "@grucloud/bau-ui/slider";`,
  examples: [
    {
      title: "Default",
      description: "A simple slider.",
      code: codeExampleDefault,
      createComponent: sliderDefault,
    },
    {
      title: "Horizontal Mark",
      description: "A slider with horizontal mark.",
      code: codeExampleMark,
      createComponent: sliderMark,
    },
    {
      title: "Vertical Mark",
      description: "A vertical slider with marks.",
      code: codeExampleVertical,
      createComponent: sliderVertical,
    },
  ],
  gridItem: sliderGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(sliderSpec);
};
