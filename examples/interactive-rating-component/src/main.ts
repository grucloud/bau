import { createContext, type Context } from "@grucloud/bau-ui/context";
import interactiveRating from "./interactiveRating";

import "./style.css";

const context = createContext();

const app = (context: Context) => {
  const { bau } = context;
  const { main } = bau.tags;

  const InteractiveRating = interactiveRating(context);

  return function () {
    return main(InteractiveRating());
  };
};

const App = app(context);
document.getElementById("app")?.replaceChildren(App());
