import BauRouter from "@grucloud/bau-router";
import globalStyle from "@grucloud/bau-ui/globalStyle";

import { initialScreenFadeOut } from "./initialScreenFadeOut";
import { createContext } from "@grucloud/bau-ui/context";
import { layoutDefault } from "./layoutDefault";
import { createRoutes } from "./routes";
import { notFoundRouteDefault } from "./notFoundRoute";
import { onLocationChange } from "./onLocationChange";
import { createStyles } from "./style.js";
import { createStylesDark } from "./styleDark.js";

initialScreenFadeOut();

const config = { title: "Bau", base: "/bau/bau-ui" };
const context = createContext({
  config,
});

context.states = {
  pathname: context.bau.state(
    window.location.pathname.replace(config.base, "")
  ),
};

createStyles(context);
createStylesDark(context);

BauRouter({
  routes: createRoutes({ context }),
  onLocationChange: onLocationChange({
    context,
    LayoutDefault: layoutDefault(context),
    config,
  }),
  notFoundRoute: notFoundRouteDefault(context),
});
