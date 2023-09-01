import BauRouter from "@grucloud/bau-router";
import { createContext } from "@grucloud/bau-ui/context";

import { initialScreenFadeOut } from "./initialScreenFadeOut.js";
import { layoutDefault } from "./layoutDefault.js";
import { createRoutes } from "./routes.js";
import { notFoundRouteDefault } from "./notFoundRoute.js";
import { onLocationChange } from "./onLocationChange.js";
import { createStyles } from "./style.js";
import rest from "./rest";
import config from "./config";

initialScreenFadeOut();

const context = createContext({
  config,
});

context.rest = rest(context);
createStyles(context);

BauRouter({
  routes: createRoutes({ context }),
  onLocationChange: onLocationChange({
    context,
    LayoutDefault: layoutDefault(context),
    config,
  }),
  notFoundRoute: notFoundRouteDefault(context),
});
