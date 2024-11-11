import { createContext } from "@grucloud/bau-ui/context";
import BauRouter from "@grucloud/bau-router";
import { onLocationChange } from "./onLocationChange";
import { layoutDefault } from "./layoutDefault";
import { createRoutes } from "./routes";
import "./style.css";

const config = { base: "/bau/frontendmentor/rest-countries" };

const context = createContext({ config });

BauRouter({
  routes: createRoutes({ context }),
  onLocationChange: onLocationChange({
    context,
    config,
    LayoutDefault: layoutDefault(context),
  }),
  //notFoundRoute: notFoundRouteDefault(context),
});
