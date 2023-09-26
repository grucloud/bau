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

// Org
import orgListPage from "./pages/org/orgListPage";
import orgCreatePage from "./pages/org/orgCreatePage";
import orgDetailPage from "./pages/org/orgDetailPage";
import orgDestroyPage from "./pages/org/orgDestroyPage";

// Project
import projectCreatePage from "./pages/project/projectCreatePage";
import projectDetailPage from "./pages/project/projectDetailPage";
import projectDestroyPage from "./pages/project/projectDestroyPage";

// Git Credential
import gitCredentialCreatePage from "./pages/gitCredential/gitCredentialCreatePage";
import gitCredentialEditPage from "./pages/gitCredential/gitCredentialEditPage";
import gitCredentialDestroyPage from "./pages/gitCredential/gitCredentialDestroyPage";

// Workspace
import workspaceCreatePage from "./pages/workspace/workspaceCreatePage";
import workspaceDetailPage from "./pages/workspace/workspaceDetailPage";
import workspaceDestroyPage from "./pages/workspace/workspaceDestroyPage";

//
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
        path: "(?<org_id>.{12})",
        action: ({ match: { groups } }: any) => ({
          title: "Organisation Details",
          component: () => orgDetailPage(context)(groups),
        }),
        children: [
          {
            path: "destroy",
            action: ({ match: { groups } }: any) => ({
              title: "Delete Organisation",
              component: () => orgDestroyPage(context)(groups),
            }),
          },
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
                action: ({ match: { groups } }: any) => ({
                  title: "Create Project",
                  component: () => projectCreatePage(context)(groups),
                }),
              },
              {
                path: "(?<project_id>.{16})",
                action: ({ match: { groups } }: any) => ({
                  title: "Project Details",
                  component: () => projectDetailPage(context)(groups),
                }),
                children: [
                  {
                    path: "destroy",
                    action: ({ match: { groups } }: any) => ({
                      title: "Delete Project",
                      component: () => projectDestroyPage(context)(groups),
                    }),
                  },
                  {
                    path: "workspaces",
                    action: ({ match: { groups } }: any) => ({
                      title: "workspaces",
                      component: () => {
                        return `workspaces: ${groups.project_id} from Org: ${groups.org_id} `;
                      },
                    }),
                    children: [
                      {
                        path: "create",
                        action: ({ match: { groups } }: any) => ({
                          title: "Create Workspace",
                          component: () => workspaceCreatePage(context)(groups),
                        }),
                      },
                      {
                        path: "(?<workspace_id>.{18})",
                        action: ({ match: { groups } }: any) => ({
                          title: "Workspace Details",
                          component: () => workspaceDetailPage(context)(groups),
                        }),
                        children: [
                          {
                            path: "destroy",
                            action: ({ match: { groups } }: any) => ({
                              title: "Delete Workspace",
                              component: () =>
                                workspaceDestroyPage(context)(groups),
                            }),
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: "git_credential",
            action: ({ match: { groups } }: any) => ({
              title: "Git Credential",
              component: () => {
                return `Git Credential: ${groups.org_id} `;
              },
            }),
            children: [
              {
                path: "create",
                action: ({ match: { groups } }: any) => ({
                  title: "Create Git Credential",
                  component: () => gitCredentialCreatePage(context)(groups),
                }),
              },
              {
                path: "(?<git_credential_id>.{13})",
                action: ({ match: { groups } }: any) => ({
                  title: "Git Credential Details",
                  component: () => gitCredentialEditPage(context)(groups),
                }),
                children: [
                  {
                    path: "destroy",
                    action: ({ match: { groups } }: any) => ({
                      title: "Delete Git Credential",
                      component: () =>
                        gitCredentialDestroyPage(context)(groups),
                    }),
                  },
                ],
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
