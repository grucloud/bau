import { createContext, type Context } from "@grucloud/bau-ui/context";
import socialLinksProfile from "./socialLinksProfile";

import "./style.css";

const context = createContext();

const app = (context: Context) => {
  const { bau } = context;
  const { main } = bau.tags;

  const SocialLinksProfile = socialLinksProfile(context);

  return function () {
    return main(SocialLinksProfile());
  };
};

const App = app(context);
document.getElementById("app")?.replaceChildren(App());
