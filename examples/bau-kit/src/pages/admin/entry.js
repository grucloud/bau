import BauRouter from "@grucloud/bau-router";

import { initialScreenFadeOut } from "../../utils/initialScreenFadeOut";
import { createContext } from "../../utils/context";

import { layoutDefault } from "./layoutDefault";
import { notFoundRouteDefault } from "../../utils/notFoundRoute";
import { onLocationChange } from "../../utils/onLocationChange";
import { createRoutes } from "./routes";

initialScreenFadeOut();

const config = { title: "My Admin App", base: "/admin" };
const context = createContext({ config });

BauRouter({
  context,
  routes: createRoutes({ context }),
  onLocationChange: onLocationChange({
    LayoutDefault: layoutDefault(context),
    config,
  }),
  notFoundRoute: notFoundRouteDefault(context),
});
