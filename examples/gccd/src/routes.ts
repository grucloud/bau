import { type Context } from "@grucloud/bau-ui/context";
import loginPage from "./pages/loginPage";
import logoutPage from "./pages/logoutPage";
import profilePage from "./pages/profilePage";
import accountDeletePage from "./pages/accountDeletePage";

// Org
import orgListPage from "./pages/org/orgListPage";
import orgCreatePage from "./pages/org/orgCreatePage";
import orgDetailPage from "./pages/org/orgDetailPage";
import orgDestroyPage from "./pages/org/orgDestroyPage";

// Project
import projectCreatePage from "./pages/project/projectCreatePage";
import projectDetailPage from "./pages/project/projectDetailPage";
import projectDestroyPage from "./pages/project/projectDestroyPage";
import projectUserPage from "./pages/project/projectUserPage";

// Git Credential
import gitCredentialCreatePage from "./pages/gitCredential/gitCredentialCreatePage";
import gitCredentialEditPage from "./pages/gitCredential/gitCredentialEditPage";
import gitCredentialDestroyPage from "./pages/gitCredential/gitCredentialDestroyPage";

// Workspace
import workspaceUserPage from "./pages/workspace/workspaceUserPage";
import workspaceCreatePage from "./pages/workspace/workspaceCreatePage";
import workspaceDetailPage from "./pages/workspace/workspaceDetailPage";
import workspaceDestroyPage from "./pages/workspace/workspaceDestroyPage";

// Run
import runCreatePage from "./pages/run/runCreatePage";
import runDetailPage from "./pages/run/runDetailPage";
import runDestroyPage from "./pages/run/runDestroyPage";
import runUserPage from "./pages/run/runUserPage";

// Cloud Authentication
import awsCreatePage from "./pages/cloudAuthentication/awsCreatePage";
import awsEditPage from "./pages/cloudAuthentication/awsEditPage";
import azureCreatePage from "./pages/cloudAuthentication/azureCreatePage";
import azureEditPage from "./pages/cloudAuthentication/azureEditPage";
import googleCreatePage from "./pages/cloudAuthentication/googleCreatePage";
import googleEditPage from "./pages/cloudAuthentication/googleEditPage";
import cloudAuthenticationDestroyPage from "./pages/cloudAuthentication/cloudAuthenticationDestroyPage";

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
  {
    path: "workspaces",
    action: () => ({
      title: "Workspaces",
      component: () => workspaceUserPage(context)({}),
    }),
  },
  {
    path: "projects",
    action: () => ({
      title: "Projects",
      component: () => projectUserPage(context)({}),
    }),
  },
  {
    path: "runs",
    action: () => ({
      title: "Runs",
      component: () => runUserPage(context)({}),
    }),
  },
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
        path: "(?<org_id>.[^/]+)",
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
              component: () => orgDetailPage(context)(groups),
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
                path: "(?<project_id>.[^/]+)",
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
                      component: () => projectDetailPage(context)(groups),
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
                        path: "(?<workspace_id>.[^/]+)",
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
                          {
                            path: "cloud_authentication",
                            action: ({ match: { groups } }: any) => ({
                              title: "Cloud Authentication",
                              component: () =>
                                workspaceDetailPage(context)(groups),
                            }),
                            children: [
                              {
                                path: "create",
                                action: ({ match: { groups } }: any) => ({
                                  title: "Cloud Authentication",
                                  component: () =>
                                    workspaceDetailPage(context)(groups),
                                }),
                                children: [
                                  {
                                    path: "aws",
                                    action: ({ match: { groups } }: any) => ({
                                      title: "Create AWS Authentication",
                                      component: () =>
                                        awsCreatePage(context)(groups),
                                    }),
                                  },
                                  {
                                    path: "azure",
                                    action: ({ match: { groups } }: any) => ({
                                      title: "Create Azure Authentication",
                                      component: () =>
                                        azureCreatePage(context)(groups),
                                    }),
                                  },
                                  {
                                    path: "google",
                                    action: ({ match: { groups } }: any) => ({
                                      title:
                                        "Create Google Cloud Authentication",
                                      component: () =>
                                        googleCreatePage(context)(groups),
                                    }),
                                  },
                                ],
                              },
                              {
                                path: "(?<cloud_authentication_id>[^/]+)",
                                action: ({ match: { groups } }: any) => ({
                                  title: "Cloud Authentication",
                                  component: () =>
                                    workspaceDetailPage(context)(groups),
                                }),
                                children: [
                                  {
                                    path: "destroy",
                                    action: ({ match: { groups } }: any) => ({
                                      title: "Delete Cloud Authentication",
                                      component: () =>
                                        cloudAuthenticationDestroyPage(context)(
                                          groups
                                        ),
                                    }),
                                  },
                                  {
                                    path: "edit",
                                    action: ({ match: { groups } }: any) => ({
                                      title: "Edit Cloud Authentication",
                                      component: () =>
                                        workspaceDetailPage(context)(groups),
                                    }),
                                    children: [
                                      {
                                        path: "aws",
                                        action: ({
                                          match: { groups },
                                        }: any) => ({
                                          title: "Edit AWS Authentication",
                                          component: () =>
                                            awsEditPage(context)(groups),
                                        }),
                                      },
                                      {
                                        path: "azure",
                                        action: ({
                                          match: { groups },
                                        }: any) => ({
                                          title: "Edit Azure Authentication",
                                          component: () =>
                                            azureEditPage(context)(groups),
                                        }),
                                      },
                                      {
                                        path: "google",
                                        action: ({
                                          match: { groups },
                                        }: any) => ({
                                          title:
                                            "Edit Google Cloud Authentication",
                                          component: () =>
                                            googleEditPage(context)(groups),
                                        }),
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            path: "runs",
                            action: ({ match: { groups } }: any) => ({
                              title: "List run",
                              component: () =>
                                workspaceDetailPage(context)(groups),
                            }),
                            children: [
                              {
                                path: "create",
                                action: ({ match: { groups } }: any) => ({
                                  title: "Create Run",
                                  component: () =>
                                    runCreatePage(context)(groups),
                                }),
                              },
                              {
                                path: "(?<run_id>[^/]+)",
                                action: ({ match: { groups } }: any) => ({
                                  title: "Run Details",
                                  component: () =>
                                    runDetailPage(context)(groups),
                                }),
                                children: [
                                  {
                                    path: "destroy",
                                    action: ({ match: { groups } }: any) => ({
                                      title: "Delete Run",
                                      component: () =>
                                        runDestroyPage(context)(groups),
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
                ],
              },
            ],
          },
          {
            path: "git_credential",
            action: ({ match: { groups } }: any) => ({
              title: "Git Credential",
              component: () => orgDetailPage(context)(groups),
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
      description: "Login to GruCloud",
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
