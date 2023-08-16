import { createContext } from "@grucloud/bau-ui/context";
import myComponent from "./myComponent";
const context = createContext();

const app = (context) => {
  const { bau, css } = context;
  const { div } = bau.tags;

  const className = css`
    border: 2px dotted grey;
  `;

  const MyComponent = myComponent(context);

  return function () {
    return div({ class: className }, "Hello Bau", MyComponent());
  };
};

const App = app(context);
document.getElementById("app").replaceChildren(App());
