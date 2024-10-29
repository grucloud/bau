import { createContext, type Context } from "@grucloud/bau-ui/context";
import resultSummary from "./resultSummary";

import "./style.css";

const context = createContext();

const app = (context: Context) => {
  const { bau } = context;
  const { main } = bau.tags;

  const ResultSummary = resultSummary(context);

  return function () {
    return main(ResultSummary());
  };
};

const App = app(context);
document.getElementById("app")?.replaceChildren(App());
