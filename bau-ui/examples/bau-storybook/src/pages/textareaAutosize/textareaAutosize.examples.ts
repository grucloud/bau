import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

//import textareaAutosizeGridItem from "./textareaAutosize-grid-item.ts";

import textareaAutosizeUncontrolled from "./textareaAutosize-example-uncontrolled.ts";
// @ts-ignore
import codeExampleUncontrolled from "./textareaAutosize-example-uncontrolled.ts?raw";

import textareaAutosizeControlled from "./textareaAutosize-example-controlled.ts";
// @ts-ignore
import codeExampleControlled from "./textareaAutosize-example-controlled.ts?raw";

export const textareaAutosizeSpec = {
  title: "TextareaAutosize",
  package: "textareaAutosize",
  description:
    "The textareaAutosize component displays an html textarea with automatic sizing.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/textareaAutosize/textareaAutosize.js",
  importStatement: `import textareaAutosize from "@grucloud/bau-ui/textareaAutosize";`,
  examples: [
    {
      title: "Uncontrolled",
      description: "A simple uncontrolled textareaAutosize.",
      code: codeExampleUncontrolled,
      createComponent: textareaAutosizeUncontrolled,
    },
    {
      title: "Controlled",
      description: "A simple controlled textareaAutosize.",
      code: codeExampleControlled,
      createComponent: textareaAutosizeControlled,
    },
  ],
  //gridItem: textareaAutosizeGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(textareaAutosizeSpec);
};
