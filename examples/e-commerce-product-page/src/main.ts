import { createContext } from "@grucloud/bau-ui/context";
import BauRouter from "@grucloud/bau-router";
import { onLocationChange } from "./onLocationChange";
import { layoutDefault } from "./layoutDefault";
import { createRoutes } from "./routes";
import { notFoundRouteDefault } from "./notFoundRoute";
import "./style.css";

const config = { base: "/bau/frontendmentor/e-commerce-product-page" };

const context = createContext({ config });

const cartState = context.bau.state<CartItem[]>([
  // {
  //   name: "Fall Limited Edition Sneakers",
  //   price: 125,
  //   quantity: 2,
  //   thumbnail: "./assets/images/image-product-1-thumbnail.jpg",
  // },
]);

BauRouter({
  routes: createRoutes(context, { cartState }),
  onLocationChange: onLocationChange({
    context,
    config,
    LayoutDefault: layoutDefault(context, { cartState }),
  }),
  notFoundRoute: notFoundRouteDefault(context),
});
