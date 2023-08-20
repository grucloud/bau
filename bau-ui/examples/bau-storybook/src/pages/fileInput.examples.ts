import { Context } from "@grucloud/bau-ui/context";

import pageExample from "./pageExample";

import fileInputGridItem from "./fileInput/fileInput-grid-item.ts";

import fileInputDefault from "./fileInput/fileInput-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./fileInput/fileInput-example-default.ts?raw";

export const fileInputSpec = {
  title: "File Input",
  package: "fileInput",
  description:
    "The fileInput component displays wraps the native input file type.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",
  importStatement: `import fileInput from "@grucloud/bau-ui/fileInput";`,
  examples: [
    {
      title: "Default",
      description: "A simple file input.",
      code: codeExampleDefault,
      createComponent: fileInputDefault,
    },
  ],
  gridItem: fileInputGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(fileInputSpec);
};
