import { createContext, type Context } from "@grucloud/bau-ui/context";
import faqAccordion from "./faqAccordion";

import "./style.css";

const context = createContext();

const app = (context: Context) => {
  const { bau } = context;
  const { main } = bau.tags;

  const FaqAccordion = faqAccordion(context);

  return function () {
    return main(FaqAccordion());
  };
};

const App = app(context);
document.getElementById("app")?.replaceChildren(App());
