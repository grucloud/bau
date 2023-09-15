// A lean router
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
      return route
        ? route.action({ match: pathname.match(route.regex) })
        : notFoundRoute;
    },
  };
};

export default function Router({ routes, notFoundRoute, onLocationChange }) {
  const router = LeanRouter({
    routes,
    notFoundRoute,
  });

  window.addEventListener("popstate", (event) => {
    // TODO
    //console.log("popstate");
    //if (event.state != null) {
    // Back or Next button and not an in page navigation
    //onLocationChange({ router });
    // }
    if (event.state != null) {
      // Back or Next button and not an in page navigation
      onLocationChange({ router });
    }
  });

  window.history.pushState = new Proxy(window.history.pushState, {
    apply: (target, thisArg, argArray) => {
      target.apply(thisArg, argArray);
      onLocationChange({ router });
    },
  });

  document.addEventListener("click", (event) => {
    const { target } = event;
    // Beware: target.href and target.getAttribute("href") are different !
    const href = target.getAttribute("href");
    if (
      target.tagName === "A" &&
      href &&
      !href.startsWith("http") &&
      !href.replace(window.location.pathname, "").startsWith("#")
    ) {
      history.pushState({}, null, href);

      window.scrollTo({
        top: 0,
        left: 0,
      });

      event.preventDefault();
    }
  });

  onLocationChange({ router });
  return router;
}
