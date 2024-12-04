import { createContext, type Context } from "@grucloud/bau-ui/context";
import interactiveCommentsSection from "./interactiveCommentsSection";
import "./style.css";

const context = createContext();

const app = (context: Context) => {
  const { bau } = context;
  const { main } = bau.tags;
  const InteractiveCommentsSection = interactiveCommentsSection(context);

  return function () {
    return main(InteractiveCommentsSection());
  };
};

const App = app(context);
document.getElementById("app")?.replaceChildren(App());
