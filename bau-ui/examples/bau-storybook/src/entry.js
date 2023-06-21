import BauRouter from "@grucloud/bau-router";
import globalStyle from "@grucloud/bau-ui/globalStyle";

import { initialScreenFadeOut } from "./initialScreenFadeOut";
import { createContext } from "./context";
import { layoutDefault } from "./layoutDefault";
import { createRoutes } from "./routes";
import { notFoundRouteDefault } from "./notFoundRoute";
import { onLocationChange } from "./onLocationChange";

initialScreenFadeOut();

const config = { title: "Bau", base: "/bau" };
const context = createContext({ config });

const colorPalette = [
  ["primary", { h: "230", s: "48%", l: "47%" }],
  ["secondary", { h: "338", s: "100%", l: "48%" }],
  ["success", { h: "120", s: "100%", l: "32%" }],
  ["info", { h: "194", s: "80%", l: "62%" }],
  ["warning", { h: "43", s: "100%", l: "50%" }],
  ["danger", { h: "358", s: "95%", l: "60%" }],
];

globalStyle(context, { colorPalette });

BauRouter({
  routes: createRoutes({ context }),
  onLocationChange: onLocationChange({
    LayoutDefault: layoutDefault(context),
    config,
  }),
  notFoundRoute: notFoundRouteDefault(context),
});
