import { main } from "./main";

export const createRoutes = ({ context }) => [
  {
    path: "",
    action: (routerContext) => ({
      title: "BauUI Storybook",
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
