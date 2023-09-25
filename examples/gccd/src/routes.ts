import { type Context } from "@grucloud/bau-ui/context";
import loginPage from "./pages/loginPage";
import logoutPage from "./pages/logoutPage";
import profilePage from "./pages/profilePage";
import accountDeletePage from "./pages/accountDeletePage";
// import infrastructurePage from "./pages/infra/infraListPage";
// import infraStepperPage from "./pages/infra/infraStepperPage";
// import infraDetailPage from "./pages/infra/infraDetailsPage";
// import infraDetailEditAwsPage from "./pages/infra/infraDetailEditAwsPage";
// import infraDetailEditAzurePage from "./pages/infra/infraDetailEditAzurePage";
// import infraDetailEditGooglePage from "./pages/infra/infraDetailEditGooglePage";
//import gitCredentialEditPage from "./pages/infra/gitCredentialEditPage";
//import infraDestroyPage from "./pages/infra/infraDestroyPage";

import orgListPage from "./pages/org/orgListPage";
import orgCreatePage from "./pages/org/orgCreatePage";
import orgDetailPage from "./pages/org/orgDetailPage";

import layoutUnauthenticated from "./layoutUnauthenticated";

export const createRoutes = ({ context }: { context: Context }) => [
  {
    path: "",
    action: () => ({
      title: "Dashboard",
      component: () => orgListPage(context)({}),
    }),
  },
  // {
  //   path: "infra",
  //   action: () => ({
  //     title: "Infrastructures",
  //     component: infrastructurePage(context),
  //   }),
  //   children: [
  //     {
  //       path: "create",
  //       action: () => ({
  //         title: "Create New Infrastructure",
  //         component: infraStepperPage(context),
  //       }),
  //     },
  //     {
  //       path: "details/(?<id>.+)",
  //       action: ({ match }: any) => ({
  //         title: "Infrastructure Details",
  //         component: () => orgDetailPage(context)({ org_id: match.groups.id }),
  //       }),
  //     },
  //     {
  //       path: "details/(?<id>.+)/destroy",
  //       action: ({ match }: any) => ({
  //         title: "Destroy Infrastructure",
  //         component: () => infraDestroyPage(context)({ id: match.groups.id }),
  //       }),
  //     },
  //     {
  //       path: "details/(?<id>.+)/edit/aws",
  //       action: ({ match }: any) => ({
  //         title: "Edit AWS",
  //         component: () =>
  //           infraDetailEditAwsPage(context)({ id: match.groups.id }),
  //       }),
  //     },
  //     {
  //       path: "details/(?<id>.+)/edit/azure",
  //       action: ({ match }: any) => ({
  //         title: "Edit AWS",
  //         component: () =>
  //           infraDetailEditAzurePage(context)({ id: match.groups.id }),
  //       }),
  //     },
  //     {
  //       path: "details/(?<id>.+)/edit/google",
  //       action: ({ match }: any) => ({
  //         title: "Edit Google Cloud",
  //         component: () =>
  //           infraDetailEditGooglePage(context)({ id: match.groups.id }),
  //       }),
  //     },
  //   ],
  // },
  {
    path: "org",
    action: () => ({
      title: "Organisations",
      component: () => orgListPage(context)({}),
    }),
    children: [
      {
        path: "create",
        action: () => ({
          title: "Create New Organisation",
          component: () => orgCreatePage(context)({}),
        }),
      },
      {
        path: "(?<org_id>.{12})/destroy",
        action: ({ match: { groups } }: any) => ({
          title: "Delete Organisation",
          component: () => `Delete Organisation: ${groups.org_id} `,
        }),
      },
      {
        path: "(?<org_id>.{12})",
        action: ({ match: { groups } }: any) => ({
          title: "Organisation Details",
          component: () => orgDetailPage(context)({ org_id: groups.org_id }),
        }),
        children: [
          {
            path: "projects",
            action: ({ match: { groups } }: any) => ({
              title: " Project",
              component: () => {
                return `Projects List Org: ${groups.org_id} `;
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
                    return `View Project: ${groups.projectId} from Org: ${groups.org_id} `;
                  },
                }),
              },
              {
                path: "(?<projectId>.+)/destroy",
                action: ({ match: { groups } }: any) => ({
                  title: "Delete Project",
                  component: () => {
                    return `Delete Project: ${groups.projectId} from Org: ${groups.org_id} `;
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
