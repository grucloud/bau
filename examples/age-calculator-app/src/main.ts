import { createContext, type Context } from "@grucloud/bau-ui/context";
import ageCalculator from "./ageCalculator";
import "./style.css";

const context = createContext();

const app = (context: Context) => {
  const { bau } = context;
  const { main } = bau.tags;
  const AgeCalculator = ageCalculator(context);

  return function () {
    return main(AgeCalculator());
  };
};

const App = app(context);
document.getElementById("app")?.replaceChildren(App());
