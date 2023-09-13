import { type Context } from "@grucloud/bau-ui/context";
import loginPage from "./pages/loginPage";
import logoutPage from "./pages/logoutPage";
import infrastructurePage from "./pages/infra/infraListPage";
import profilePage from "./pages/profilePage";
import accountDeletePage from "./pages/accountDeletePage";
import infraStepperPage from "./pages/infra/infraStepperPage";
import infraDetailPage from "./pages/infra/infraDetailsPage";
import infraDetailEditAwsPage from "./pages/infra/infraDetailEditAwsPage";
import infraDetailEditAzurePage from "./pages/infra/infraDetailEditAzurePage";
import infraDetailEditGooglePage from "./pages/infra/infraDetailEditGooglePage";

import infraDestroyPage from "./pages/infra/infraDestroyPage";
import layoutUnauthenticated from "./layoutUnauthenticated";

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
        path: "details/(?<id>.+)/edit/aws",
        action: ({ match }: any) => ({
          title: "Edit AWS",
          component: () =>
            infraDetailEditAwsPage(context)({ id: match.groups.id }),
        }),
      },
      {
        path: "details/(?<id>.+)/edit/azure",
        action: ({ match }: any) => ({
          title: "Edit AWS",
          component: () =>
            infraDetailEditAzurePage(context)({ id: match.groups.id }),
        }),
      },
      {
        path: "details/(?<id>.+)/edit/google",
        action: ({ match }: any) => ({
          title: "Edit Google Cloud",
          component: () =>
            infraDetailEditGooglePage(context)({ id: match.groups.id }),
        }),
      },
      {
        path: "details/(?<id>.+)/destroy",
        action: ({ match }: any) => ({
          title: "Destroy Infrastructure",
          component: () => infraDestroyPage(context)({ id: match.groups.id }),
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
