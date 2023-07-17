import componentList from "./componentList";
import pagesList from "./pagesList";

export const createRoutes = ({ context }) => [
  {
    path: "",
    action: (routerContext) => ({
      title: "Storybook",
      component: componentList(context),
    }),
  },
  {
    path: "components",
    action: (routerContext) => ({
      title: "Component",
      component: componentList(context),
    }),
  },
  {
    path: "pages",
    action: (routerContext) => ({
      title: "Pages",
      component: pagesList(context),
    }),
  },
  // {
  //   path: "login",
  //   action: (routerContext) => ({
  //     title: "Login",
  //     component: asyncView({
  //       context,
  //       getModule: () => import("../formLogin"),
  //       Loader: () => "Loading",
  //     }),
  //   }),
  // },
  // {
  //   path: "register",
  //   action: (routerContext) => ({
  //     title: "Register",
  //     component: FormLogin(context),
  //   }),
  //   children: [
  //     {
  //       path: /(?<id>\d+)/,
  //       action: (routerContext) => ({
  //         title: "Register Code",
  //         component: FormLogin(context),
  //       }),
  //     },
  //   ],
  // },
];
