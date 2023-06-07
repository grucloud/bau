import { asyncView } from "../pages/asyncView";

const routeFullPath = (route, paths) => ({
  ...route,
  paths: [...paths, route.path],
});

const flatRoutes = ({ paths = [], routes }) =>
  routes.flatMap(({ children, ...route }) => {
    const newRoute = routeFullPath(route, paths);
    if (children) {
      return [
        newRoute,
        ...flatRoutes({
          paths: [...paths, route.path],
          routes: children,
        }),
      ];
    } else return newRoute;
  });

const buildRegEx = ({ paths }) => {
  const pattern = paths
    .map((path) => (path instanceof RegExp ? path.source : path))
    .map((path) => String.raw`\/${path}`)
    .join("");
  return new RegExp(`^${pattern}$`);
};

const LeanRouter = ({ routes = [], notFoundRoute }) => {
  const _routes = flatRoutes({ routes }).map((route) => ({
    ...route,
    regex: buildRegEx(route),
  }));

  return {
    resolve: ({ pathname }) => {
      const route = _routes.find(({ regex }) => regex.test(pathname));
      if (route) {
        return route.action({ match: pathname.match(route.regex) });
      } else {
        return notFoundRoute;
      }
    },
  };
};

export const Router = ({ context, routes, LayoutDefault }) => {
  const { tr, config } = context;
  const router = LeanRouter({
    routes,
    notFoundRoute: {
      title: tr("Page Not Found"),
      component: asyncView({
        context,
        getModule: () => import("../pages/notFound"),
        Loader: () => "Loading",
      }),
    },
  });

  const onLocationChange = () => {
    const {
      title,
      component,
      Layout = LayoutDefault,
    } = router.resolve({
      pathname: location.pathname.replace(config.base, ""),
    });
    const app = document.getElementById("app");
    app.replaceChildren(Layout({ component }));
    document.title = `${title}`;
  };

  window.addEventListener("popstate", onLocationChange);
  window.history.pushState = new Proxy(window.history.pushState, {
    apply: (target, thisArg, argArray) => {
      target.apply(thisArg, argArray);
      onLocationChange();
    },
  });

  onLocationChange();
  return router;
};
