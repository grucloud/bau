import { type Context } from "@grucloud/bau-ui/context";

export const notFoundRouteDefault = (context: Context) => ({
  title: context.tr("Page Not Found"),
  component: () => "Not Found",
});
