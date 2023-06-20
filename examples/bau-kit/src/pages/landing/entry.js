import { initialScreenFadeOut } from "../../utils/initialScreenFadeOut";
import BauRouter from "@grucloud/bau-router";
import { createContext } from "../../utils/context";

import { layoutDefault } from "./layoutDefault";
import { createRoutes } from "./routes";
import { notFoundRouteDefault } from "../../utils/notFoundRoute";
import { onLocationChange } from "../../utils/onLocationChange";

initialScreenFadeOut();
const config = { title: "Landing", base: "" };
const context = createContext({ config });

BauRouter({
  routes: createRoutes({ context }),
  onLocationChange: onLocationChange({
    LayoutDefault: layoutDefault(context),
    config,
  }),
  notFoundRoute: notFoundRouteDefault(context),
});
