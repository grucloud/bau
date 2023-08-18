import { createContext, type Context } from "@grucloud/bau-ui/context";
import globalStyle, { type ColorDefs } from "@grucloud/bau-ui/globalStyle";

import myComponent from "./myComponent";

const context = createContext();

const colorPalette: ColorDefs[] = [
  ["neutral", { h: "0", s: "0%", l: "20%" }],
  ["primary", { h: "230", s: "48%", l: "20%" }],
  ["secondary", { h: "338", s: "100%", l: "20%" }],
  ["success", { h: "120", s: "100%", l: "20%" }],
  ["info", { h: "194", s: "80%", l: "20%" }],
  ["warning", { h: "43", s: "100%", l: "20%" }],
  ["danger", { h: "358", s: "95%", l: "20%" }],
];

const app = (context: Context) => {
  const { bau, css } = context;
  const { div } = bau.tags;

  globalStyle(context, { colorPalette });

  const className = css`
    border: 2px dotted grey;
  `;

  const MyComponent = myComponent(context);

  return function () {
    return div({ class: className }, MyComponent());
  };
};

const App = app(context);
document.getElementById("app")?.replaceChildren(App());
