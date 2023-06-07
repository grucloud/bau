import { main } from "./main";
//import { asyncView } from "../asyncView";

export const createRoutes = ({ context }) => [
  {
    path: "",
    action: (routerContext) => ({
      title: "Home",
      component: main(context),
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
];
