import { createContext, type Context } from "@grucloud/bau-ui/context";
import productPreviewCard from "./productPreviewCard";

import "./style.css";

const context = createContext();

const app = (context: Context) => {
  const { bau } = context;
  const { main } = bau.tags;

  const ProductPreviewCard = productPreviewCard(context);

  return function () {
    return main(ProductPreviewCard());
  };
};

const App = app(context);
document.getElementById("app")?.replaceChildren(App());
