import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import formDefault from "./form-login.ts";
// @ts-ignore
import codeExampleForm from "./form-login.ts?raw";

export const formSpec = {
  title: "Form",
  package: "form",
  description: "The form component displays an html form.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/form/form.js",
  importStatement: `import form from "@grucloud/bau-ui/form";`,
  examples: [
    {
      title: "Login page",
      description: "A login page.",
      code: codeExampleForm,
      createComponent: formDefault,
    },
  ],
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(formSpec);
};
