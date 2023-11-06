import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import formDefault from "./form-login.ts";
// @ts-ignore
import codeExampleForm from "./form-login.ts?raw";

import formSimple from "./form-simple.ts";
// @ts-ignore
import codeExampleSimple from "./form-simple.ts?raw";

import formSimpleState from "./form-simple-state.ts";
// @ts-ignore
import codeExampleSimpleState from "./form-simple-state.ts?raw";

export const formSpec = {
  title: "Form",
  package: "form",
  description: "The form component displays an html form.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/form/form.js",
  importStatement: `import form from "@grucloud/bau-ui/form";`,
  examples: [
    {
      title: "Simple form",
      description: "A simple form.",
      code: codeExampleSimple,
      createComponent: formSimple,
    },
    {
      title: "Form with state",
      description: "A form with input state and a dervied state.",
      code: codeExampleSimpleState,
      createComponent: formSimpleState,
    },
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
