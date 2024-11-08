import { createContext, type Context } from "@grucloud/bau-ui/context";
import calculator from "./calculator";

import "./style.css";

const context = createContext();

const app = (context: Context) => {
  const { bau } = context;
  const { main } = bau.tags;

  const Calculator = calculator(context);

  return function () {
    return main(Calculator());
  };
};

const App = app(context);
document.getElementById("app")?.replaceChildren(App());
