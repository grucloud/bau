import { createContext, type Context } from "@grucloud/bau-ui/context";
import contactForm from "./contactForm";

import "./style.css";

const context = createContext();

const app = (context: Context) => {
  const { bau } = context;
  const { main } = bau.tags;

  const ContactForm = contactForm(context);

  return function () {
    return main(ContactForm());
  };
};

const App = app(context);
document.getElementById("app")?.replaceChildren(App());
