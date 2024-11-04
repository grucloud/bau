import { createContext, type Context } from "@grucloud/bau-ui/context";
import mortgageRepaymentCalculator from "./mortgageRepaymentCalculator";

import "./style.css";

const context = createContext();

const app = (context: Context) => {
  const { bau } = context;
  const { main } = bau.tags;

  const MortgageRepaymentCalculator = mortgageRepaymentCalculator(context);

  return function () {
    return main(MortgageRepaymentCalculator());
  };
};

const App = app(context);
document.getElementById("app")?.replaceChildren(App());
