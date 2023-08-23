import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

//import carouselGridItem from "./carousel-grid-item.ts";

import carouselDefault from "./carousel-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./carousel-example-default.ts?raw";

export const carouselSpec = {
  title: "Carousel",
  package: "carousel",
  description: "The carousel component displays images once at a time.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",
  importStatement: `import carousel from "@grucloud/bau-ui/carousel";`,
  examples: [
    {
      title: "Simple Carousel",
      description: "A simple carousel displaying a few random pictures.",
      code: codeExampleDefault,
      createComponent: carouselDefault,
    },
  ],
  //gridItem: carouselGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(carouselSpec);
};
