import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import sliderGridItem from "./slider-grid-item.ts";

import sliderUncontrolled from "./slider-uncontrolled.ts";
// @ts-ignore
import codeUncontrolled from "./slider-uncontrolled.ts?raw";

import sliderControlled from "./slider-controlled.ts";
// @ts-ignore
import codeControlled from "./slider-controlled.ts?raw";

import sliderMark from "./slider-example-mark.ts";
// @ts-ignore
import codeExampleMark from "./slider-example-mark.ts?raw";

import sliderVertical from "./slider-example-vertical.ts";
// @ts-ignore
import codeExampleVertical from "./slider-example-vertical.ts?raw";

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
      title: "Uncontrolled slider",
      description: "A uncontrolled slider.",
      code: codeUncontrolled,
      createComponent: sliderUncontrolled,
    },
    {
      title: "Controlled slider",
      description: "A controlled slider.",
      code: codeControlled,
      createComponent: sliderControlled,
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
