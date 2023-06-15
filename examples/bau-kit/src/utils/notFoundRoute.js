import { asyncView } from "../pages/asyncView";

export const notFoundRouteDefault = (context) => ({
  title: context.tr("Page Not Found"),
  component: asyncView({
    context,
    getModule: () => import("../pages/notFound"),
    Loader: () => "Loading",
  }),
});
