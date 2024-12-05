import { createContext, type Context } from "@grucloud/bau-ui/context";
import newsletterSignupForm from "./newsletterSignupForm";
import "./style.css";

const context = createContext();

const app = (context: Context) => {
  const { bau } = context;
  const { main } = bau.tags;
  const NewsletterSignupForm = newsletterSignupForm(context);

  return function () {
    return main(NewsletterSignupForm());
  };
};

const App = app(context);
document.getElementById("app")?.replaceChildren(App());
