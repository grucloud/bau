import { type Context } from "@grucloud/bau-ui/context";

export const notFoundRouteDefault = (_: Context) => ({
  title: "Page Not Found",
  component: () => "Not Found",
});
