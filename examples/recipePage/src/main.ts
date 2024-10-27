import { createContext, type Context } from "@grucloud/bau-ui/context";
import recipePage from "./recipePage";

import "./style.css";

const context = createContext();

const app = (context: Context) => {
  const { bau } = context;
  const { main } = bau.tags;

  const RecipePage = recipePage(context);

  return function () {
    return main(RecipePage());
  };
};

const App = app(context);
document.getElementById("app")?.replaceChildren(App());
