import { createContext, type Context } from "@grucloud/bau-ui/context";
import newsHomepage from "./newsHomepage";
import "./style.css";

const context = createContext();

const app = (context: Context) => {
  const { bau } = context;
  const { main } = bau.tags;
  const NewsHomepage = newsHomepage(context);

  return function () {
    return main(NewsHomepage());
  };
};

const App = app(context);
document.getElementById("app")?.replaceChildren(App());
