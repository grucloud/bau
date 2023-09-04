import loginPage from "./pages/loginPage";
import logoutPage from "./pages/logoutPage";
import infrastructurePage from "./pages/infra/infraPage";
import profilePage from "./pages/profilePage";
import accountDeletePage from "./pages/accountDeletePage";
import infraStepperPage from "./pages/infra/infraStepperPage";
import infraDetailPage from "./pages/infra/infraDetailsPage";

import layoutUnauthenticated from "./layoutUnauthenticated";

import { type Context } from "@grucloud/bau-ui/context";

export const createRoutes = ({ context }: { context: Context }) => [
  {
    path: "",
    action: () => ({
      title: "Dashboard",
      component: infrastructurePage(context),
    }),
  },
  {
    path: "infra",
    action: () => ({
      title: "Infrastructures",
      component: infrastructurePage(context),
    }),
    children: [
      {
        path: "create",
        action: () => ({
          title: "Create New Infrastructure",
          component: infraStepperPage(context),
        }),
      },
      {
        path: "details/(?<id>.+)",
        action: ({ match }: any) => ({
          title: "Infrastructure Details",
          component: () => infraDetailPage(context)({ id: match.groups.id }),
        }),
      },
    ],
  },
  {
    path: "profile",
    action: () => ({
      title: "Profile",
      component: profilePage(context),
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
  {
    path: "accountDelete",
    action: () => ({
      title: "Delete Account",
      component: accountDeletePage(context),
    }),
  },
];
