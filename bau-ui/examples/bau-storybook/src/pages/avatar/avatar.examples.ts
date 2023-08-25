import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import avatarGridItem from "./avatar-grid-item.ts";

import avatarDefault from "./avatar-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./avatar-example-default.ts?raw";

export const avatarSpec = {
  title: "Avatar",
  package: "avatar",
  description:
    "The avatar component displays a small image or initial of a person.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",
  importStatement: `import avatar from "@grucloud/bau-ui/avatar";`,
  examples: [
    {
      title: "Default",
      description: "A simple avatar.",
      code: codeExampleDefault,
      createComponent: avatarDefault,
    },
  ],
  gridItem: avatarGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(avatarSpec);
};
