import Bau from "@grucloud/bau";
import BauRouter from "./src/bau-router";

// The context is passed around your components through the dependency injection pattern
const context = {
  bau: Bau({}),
  // t for translate
  t: (str) => str,
};

// Simple example with a default page and a secondary page:
const MyDefaultPage = ({ bau }) => {
  const { h1, div } = bau.tags;
  return () => div(h1("My Default Page"));
};

const MyPage2 = ({ bau }) => {
  const { h1, div } = bau.tags;
  return () => div(h1("MyPage2"));
};

// Create the routes:
const createRoutes = (context) => [
  {
    path: "",
    action: (routerContext) => ({
      routerContext,
      title: "MyDefaultPage",
      component: MyDefaultPage(context),
    }),
  },
  {
    path: "page2",
    action: (routerContext) => ({
      routerContext,
      title: "MyPage2",
      component: MyPage2(context),
    }),
  },
];

// Defined a view that gets call when no route is found:
const notFoundRouteDefault = ({ bau, t }) => {
  const { p, h1, div, a } = bau.tags;
  return {
    title: t("Page Not Found"),
    component: () => div(h1(t("Page Not Found"))),
  };
};

// Your view resides in a layout.
const layoutDefault = (context) => {
  const { bau } = context;
  const { main, h1, header, footer, a, ul, li } = bau.tags;

  const Header = () =>
    header(
      h1("My Header"),
      ul(
        li(a({ href: "/" }, "Landing")),
        li(a({ href: "/page2" }, "Page 2")),
        li(a({ href: "https://github.com/grucloud/bau" }, "Bau GitHub"))
      )
    );
  const Footer = () => footer(h1("My Footer"));

  return function LayoutDefault({ component }) {
    return main(Header(), component(), Footer());
  };
};

const onLocationChange = ({ router }) => {
  const {
    title,
    component,
    Layout = layoutDefault(context),
  } = router.resolve({
    pathname: location.pathname,
  });
  const app = document.getElementById("app");
  app.replaceChildren(Layout({ component }));
  document.title = `${title}`;
};

BauRouter({
  routes: createRoutes(context),
  notFoundRoute: notFoundRouteDefault(context),
  onLocationChange,
});
