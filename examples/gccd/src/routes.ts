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
//import gitCredentialEditPage from "./pages/infra/gitCredentialEditPage";

import infraDestroyPage from "./pages/infra/infraDestroyPage";

import orgListPage from "./pages/org/orgListPage";

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
        path: "details/(?<id>.+)",
        action: ({ match }: any) => ({
          title: "Infrastructure Details",
          component: () => infraDetailPage(context)({ id: match.groups.id }),
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
    ],
  },
  {
    path: "org",
    action: () => ({
      title: "Org",
      component: () => orgListPage(context)({}),
    }),
    children: [
      {
        path: "create",
        action: () => ({
          title: "Create New Organisation",
          component: () => "Create New Organisation",
        }),
      },
      {
        path: "(?<orgId>.+)/destroy",
        action: ({ match: { groups } }: any) => ({
          title: "Delete Organisation",
          component: () => `View Organisation: ${groups.orgId} `,
        }),
      },
      {
        path: "(?<orgId>.+)",
        action: ({ match: { groups } }: any) => ({
          title: "View Organisation Details",
          component: () => {
            return `View Organisation: ${groups.orgId} `;
          },
        }),
        children: [
          {
            path: "projects",
            action: ({ match: { groups } }: any) => ({
              title: " Project",
              component: () => {
                return `Projects List Org: ${groups.orgId} `;
              },
            }),
            children: [
              {
                path: "create",
                action: () => ({
                  title: "Create Project",
                  component: () => "Create Project",
                }),
              },
              {
                path: "(?<projectId>.+)",
                action: ({ match: { groups } }: any) => ({
                  title: "View Project",
                  component: () => {
                    return `View Project: ${groups.projectId} from Org: ${groups.orgId} `;
                  },
                }),
              },
              {
                path: "(?<projectId>.+)/destroy",
                action: ({ match: { groups } }: any) => ({
                  title: "Delete Project",
                  component: () => {
                    return `Delete Project: ${groups.projectId} from Org: ${groups.orgId} `;
                  },
                }),
              },
            ],
          },
        ],
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
