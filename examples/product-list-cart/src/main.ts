import { createContext, type Context } from "@grucloud/bau-ui/context";
import productListCart from "./productListCart";

import "./style.css";

const context = createContext();

const app = (context: Context) => {
  const { bau } = context;
  const { main } = bau.tags;

  const ProductListCart = productListCart(context);

  return function () {
    return main(ProductListCart());
  };
};

const App = app(context);
document.getElementById("app")?.replaceChildren(App());
