import { createContext, type Context } from "@grucloud/bau-ui/context";
import blogPreviewCard from "./blogPreviewCard";

import "./style.css";

const context = createContext();

const app = (context: Context) => {
  const { bau } = context;
  const { main } = bau.tags;

  const BlogPreviewCard = blogPreviewCard(context);

  return function () {
    return main(BlogPreviewCard());
  };
};

const App = app(context);
document.getElementById("app")?.replaceChildren(App());
