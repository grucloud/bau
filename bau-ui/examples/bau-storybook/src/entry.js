import BauRouter from "@grucloud/bau-router";
import { globalStyle } from "./globalStyle";

import { initialScreenFadeOut } from "./initialScreenFadeOut";
import { createContext } from "./context";
import { layoutDefault } from "./layoutDefault";
import { createRoutes } from "./routes";
import { notFoundRouteDefault } from "./notFoundRoute";
import { onLocationChange } from "./onLocationChange";

initialScreenFadeOut();

const config = { title: "Bau", base: "/bau" };
const context = createContext({ config });

globalStyle(context);

BauRouter({
  routes: createRoutes({ context }),
  onLocationChange: onLocationChange({
    LayoutDefault: layoutDefault(context),
    config,
  }),
  notFoundRoute: notFoundRouteDefault(context),
});