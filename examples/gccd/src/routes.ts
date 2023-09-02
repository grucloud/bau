import loginPage from "./pages/loginPage";
import logoutPage from "./pages/logoutPage";

import landingPage from "./pages/landingPage";
import layoutUnauthenticated from "./layoutUnauthenticated";

import { type Context } from "@grucloud/bau-ui/context";

export const createRoutes = ({ context }: { context: Context }) => [
  {
    path: "",
    action: () => ({
      title: "Dashboard",
      component: landingPage(context),
    }),
  },
  {
    path: "login",
    action: () => ({
      title: "Login",
      component: loginPage(context),
      Layout: layoutUnauthenticated(context),
    }),
  },
  {
    path: "logout",
    action: () => ({
      title: "Logout",
      component: logoutPage(context),
      Layout: layoutUnauthenticated(context),
    }),
  },
];
