import { type Context } from "@grucloud/bau-ui/context";
import layoutUnauthenticated from "./layoutUnauthenticated";
import lazy from "@grucloud/bau-ui/lazy";

export const createRoutes = ({ context }: { context: Context }) => {
  const Lazy = lazy(context);

  return [
    {
      path: "",
      action: () => ({
        title: "Dashboard",
        component: () =>
          Lazy({
            getModule: () => import("./pages/org/orgListPage"),
          }),
      }),
    },
    {
      path: "workspaces",
      action: () => ({
        title: "Workspaces",
        component: () =>
          Lazy({
            getModule: () => import("./pages/workspace/workspaceUserPage"),
          }),
      }),
    },
    {
      path: "projects",
      action: () => ({
        title: "Projects",
        component: () =>
          Lazy({
            getModule: () => import("./pages/project/projectUserPage"),
          }),
      }),
    },
    {
      path: "runs",
      action: () => ({
        title: "Runs",
        component: () =>
          Lazy({
            getModule: () => import("./pages/run/runUserPage"),
          }),
      }),
    },
    {
      path: "org",
      action: () => ({
        title: "Organisations",
        component: () =>
          Lazy({
            getModule: () => import("./pages/org/orgListPage"),
          }),
      }),
      children: [
        {
          path: "create",
          action: () => ({
            title: "Create New Organisation",
            component: () =>
              Lazy({
                getModule: () => import("./pages/org/orgCreatePage"),
              }),
          }),
        },
        {
          path: "(?<org_id>.[^/]+)",
          action: ({ match: { groups } }: any) => ({
            title: "Organisation Details",
            component: () =>
              Lazy({
                getModule: () => import("./pages/org/orgDetailPage"),
                props: groups,
              }),
          }),
          children: [
            {
              path: "destroy",
              action: ({ match: { groups } }: any) => ({
                title: "Delete Organisation",
                component: () =>
                  Lazy({
                    getModule: () => import("./pages/org/orgDestroyPage"),
                    props: groups,
                  }),
              }),
            },
            {
              path: "projects",
              action: ({ match: { groups } }: any) => ({
                title: " Project",
                component: () =>
                  Lazy({
                    getModule: () => import("./pages/org/orgDetailPage"),
                    props: groups,
                  }),
              }),
              children: [
                {
                  path: "create",
                  action: ({ match: { groups } }: any) => ({
                    title: "Create Project",
                    component: () =>
                      Lazy({
                        getModule: () =>
                          import("./pages/project/projectCreatePage"),
                        props: groups,
                      }),
                  }),
                },
                {
                  path: "(?<project_id>.[^/]+)",
                  action: ({ match: { groups } }: any) => ({
                    title: "Project Details",
                    component: () =>
                      Lazy({
                        getModule: () =>
                          import("./pages/project/projectDetailPage"),
                        props: groups,
                      }),
                  }),
                  children: [
                    {
                      path: "destroy",
                      action: ({ match: { groups } }: any) => ({
                        title: "Delete Project",
                        component: () =>
                          Lazy({
                            getModule: () =>
                              import("./pages/project/projectDestroyPage"),
                            props: groups,
                          }),
                      }),
                    },
                    {
                      path: "workspaces",
                      action: ({ match: { groups } }: any) => ({
                        title: "workspaces",
                        component: () =>
                          Lazy({
                            getModule: () =>
                              import("./pages/project/projectDetailPage"),
                            props: groups,
                          }),
                      }),
                      children: [
                        {
                          path: "create",
                          action: ({ match: { groups } }: any) => ({
                            title: "Create Workspace",
                            component: () =>
                              Lazy({
                                getModule: () =>
                                  import(
                                    "./pages/workspace/workspaceCreatePage"
                                  ),
                                props: groups,
                              }),
                          }),
                        },
                        {
                          path: "(?<workspace_id>.[^/]+)",
                          action: ({ match: { groups } }: any) => ({
                            title: "Workspace Details",
                            component: () =>
                              Lazy({
                                getModule: () =>
                                  import(
                                    "./pages/workspace/workspaceDetailPage"
                                  ),
                                props: groups,
                              }),
                          }),
                          children: [
                            {
                              path: "destroy",
                              action: ({ match: { groups } }: any) => ({
                                title: "Delete Workspace",
                                component: () =>
                                  Lazy({
                                    getModule: () =>
                                      import(
                                        "./pages/workspace/workspaceDestroyPage"
                                      ),
                                    props: groups,
                                  }),
                              }),
                            },
                            {
                              path: "cloud_authentication",
                              action: ({ match: { groups } }: any) => ({
                                title: "Cloud Authentication",
                                component: () =>
                                  Lazy({
                                    getModule: () =>
                                      import(
                                        "./pages/workspace/workspaceDetailPage"
                                      ),
                                    props: groups,
                                  }),
                              }),
                              children: [
                                {
                                  path: "create",
                                  action: ({ match: { groups } }: any) => ({
                                    title: "Cloud Authentication",
                                    component: () =>
                                      Lazy({
                                        getModule: () =>
                                          import(
                                            "./pages/workspace/workspaceDetailPage"
                                          ),
                                        props: groups,
                                      }),
                                  }),
                                  children: [
                                    {
                                      path: "aws",
                                      action: ({ match: { groups } }: any) => ({
                                        title: "Create AWS Authentication",
                                        component: () =>
                                          Lazy({
                                            getModule: () =>
                                              import(
                                                "./pages/cloudAuthentication/awsCreatePage"
                                              ),
                                            props: {
                                              ...groups,
                                              onSubmitted: () => {
                                                const {
                                                  org_id,
                                                  project_id,
                                                  workspace_id,
                                                } = groups;
                                                window.history.pushState(
                                                  "",
                                                  "",
                                                  `${context.config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}`
                                                );
                                              },
                                            },
                                          }),
                                      }),
                                    },
                                    {
                                      path: "azure",
                                      action: ({ match: { groups } }: any) => ({
                                        title: "Create Azure Authentication",
                                        component: () =>
                                          Lazy({
                                            getModule: () =>
                                              import(
                                                "./pages/cloudAuthentication/azureCreatePage"
                                              ),
                                            props: {
                                              ...groups,
                                              onSubmitted: () => {
                                                const {
                                                  org_id,
                                                  project_id,
                                                  workspace_id,
                                                } = groups;
                                                window.history.pushState(
                                                  "",
                                                  "",
                                                  `${context.config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}`
                                                );
                                              },
                                            },
                                          }),
                                      }),
                                    },
                                    {
                                      path: "google",
                                      action: ({ match: { groups } }: any) => ({
                                        title:
                                          "Create Google Cloud Authentication",
                                        component: () =>
                                          Lazy({
                                            getModule: () =>
                                              import(
                                                "./pages/cloudAuthentication/googleCreatePage"
                                              ),
                                            props: {
                                              ...groups,
                                              onSubmitted: () => {
                                                const {
                                                  org_id,
                                                  project_id,
                                                  workspace_id,
                                                } = groups;
                                                window.history.pushState(
                                                  "",
                                                  "",
                                                  `${context.config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}`
                                                );
                                              },
                                            },
                                          }),
                                      }),
                                    },
                                  ],
                                },
                                {
                                  path: "(?<cloud_authentication_id>[^/]+)",
                                  action: ({ match: { groups } }: any) => ({
                                    title: "Cloud Authentication",
                                    component: () =>
                                      Lazy({
                                        getModule: () =>
                                          import(
                                            "./pages/workspace/workspaceDetailPage"
                                          ),
                                        props: groups,
                                      }),
                                  }),
                                  children: [
                                    {
                                      path: "destroy",
                                      action: ({ match: { groups } }: any) => ({
                                        title: "Delete Cloud Authentication",
                                        component: () =>
                                          Lazy({
                                            getModule: () =>
                                              import(
                                                "./pages/cloudAuthentication/cloudAuthenticationDestroyPage"
                                              ),
                                            props: groups,
                                          }),
                                      }),
                                    },
                                    {
                                      path: "edit",
                                      action: ({ match: { groups } }: any) => ({
                                        title: "Edit Cloud Authentication",
                                        component: () =>
                                          Lazy({
                                            getModule: () =>
                                              import(
                                                "./pages/workspace/workspaceDetailPage"
                                              ),
                                            props: groups,
                                          }),
                                      }),
                                      children: [
                                        {
                                          path: "aws",
                                          action: ({
                                            match: { groups },
                                          }: any) => ({
                                            title: "Edit AWS Authentication",
                                            component: () =>
                                              Lazy({
                                                getModule: () =>
                                                  import(
                                                    "./pages/cloudAuthentication/awsEditPage"
                                                  ),
                                                props: groups,
                                              }),
                                          }),
                                        },
                                        {
                                          path: "azure",
                                          action: ({
                                            match: { groups },
                                          }: any) => ({
                                            title: "Edit Azure Authentication",
                                            component: () =>
                                              Lazy({
                                                getModule: () =>
                                                  import(
                                                    "./pages/cloudAuthentication/azureEditPage"
                                                  ),
                                                props: groups,
                                              }),
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
                                              Lazy({
                                                getModule: () =>
                                                  import(
                                                    "./pages/cloudAuthentication/googleEditPage"
                                                  ),
                                                props: groups,
                                              }),
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
                                  Lazy({
                                    getModule: () =>
                                      import(
                                        "./pages/workspace/workspaceDetailPage"
                                      ),
                                    props: groups,
                                  }),
                              }),
                              children: [
                                {
                                  path: "create",
                                  action: ({ match: { groups } }: any) => ({
                                    title: "Create Run",
                                    component: () =>
                                      Lazy({
                                        getModule: () =>
                                          import("./pages/run/runCreatePage"),
                                        props: groups,
                                      }),
                                  }),
                                },
                                {
                                  path: "(?<run_id>[^/]+)",
                                  action: ({ match: { groups } }: any) => ({
                                    title: "Run Details",
                                    component: () =>
                                      Lazy({
                                        getModule: () =>
                                          import("./pages/run/runDetailPage"),
                                        props: groups,
                                      }),
                                  }),
                                  children: [
                                    {
                                      path: "logs",
                                      action: ({ match: { groups } }: any) => ({
                                        title: "Run Logs",
                                        component: () =>
                                          Lazy({
                                            getModule: () =>
                                              import(
                                                "./components/run/runLogsModal"
                                              ),
                                            props: groups,
                                          }),
                                      }),
                                    },
                                    {
                                      path: "destroy",
                                      action: ({ match: { groups } }: any) => ({
                                        title: "Delete Run",
                                        component: () =>
                                          Lazy({
                                            getModule: () =>
                                              import(
                                                "./pages/run/runDestroyPage"
                                              ),
                                            props: groups,
                                          }),
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
          ],
        },
      ],
    },
    {
      path: "profile",
      action: () => ({
        title: "Profile",
        component: () =>
          Lazy({
            getModule: () => import("./pages/profilePage"),
          }),
      }),
    },
    {
      path: "login",
      action: () => ({
        title: "Login",
        description: "Login to GruCloud",
        component: () =>
          Lazy({
            getModule: () => import("./pages/loginPage"),
          }),
        Layout: layoutUnauthenticated(context),
      }),
    },
    {
      path: "logout",
      action: () => ({
        title: "Logout",
        component: () =>
          Lazy({
            getModule: () => import("./pages/logoutPage"),
          }),
        Layout: layoutUnauthenticated(context),
      }),
    },
    {
      path: "accountDelete",
      action: () => ({
        title: "Delete Account",
        component: () =>
          Lazy({
            getModule: () => import("./pages/accountDeletePage"),
          }),
      }),
    },
  ];
};
