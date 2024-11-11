import { createContext } from "@grucloud/bau-ui/context";
import BauRouter from "@grucloud/bau-router";
import { onLocationChange } from "./onLocationChange";
import { layoutDefault } from "./layoutDefault";
import { createRoutes } from "./routes";
import "./style.css";

const context = createContext();

BauRouter({
  routes: createRoutes({ context }),
  onLocationChange: onLocationChange({
    context,
    LayoutDefault: layoutDefault(context),
  }),
  //notFoundRoute: notFoundRouteDefault(context),
});
