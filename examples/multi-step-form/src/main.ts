import { createContext, type Context } from "@grucloud/bau-ui/context";
import multiStepForm from "./multiStepForm";

import "./style.css";

const context = createContext();

const app = (context: Context) => {
  const { bau } = context;
  const { main } = bau.tags;

  const MultiStepForm = multiStepForm(context);

  return function () {
    return main(MultiStepForm());
  };
};

const App = app(context);
document.getElementById("app")?.replaceChildren(App());
