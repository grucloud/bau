import BauRouter from "@grucloud/bau-router";
import { createContext } from "@grucloud/bau-ui/context";
import alertStack from "@grucloud/bau-ui/alertStack";

import { initialScreenFadeOut } from "./initialScreenFadeOut.js";
import { layoutDefault } from "./layoutDefault.js";
import { createRoutes } from "./routes.js";
import { notFoundRouteDefault } from "./notFoundRoute.js";
import { onLocationChange } from "./onLocationChange.js";
import { createStyles } from "./style.js";
import rest from "./rest";
import config from "./config";
import orgStore from "./stores/orgStore";
import projectStore from "./stores/projectStore";
import workspaceStore from "./stores/workspaceStore";
import cloudAuthenticationStore from "./stores/cloudAuthenticationStore";
import runStore from "./stores/runStore";

import infraStores from "./stores/infraStore";
import authStores from "./stores/authStore";

import gitHubStore from "./stores/gitHubStore";
import gitLabStore from "./stores/gitLabStore";

import routerStore from "./stores/routerStore";

const context = createContext({
  config,
});

initialScreenFadeOut();

const AlertStack = alertStack(context, { deleteAfterDuration: 20e3 });
document.getElementById("alert-stack")?.append(AlertStack());

context.rest = rest(context);

context.stores = {
  org: orgStore(context),
  project: projectStore(context),
  workspace: workspaceStore(context),
  cloudAuthentication: cloudAuthenticationStore(context),
  run: runStore(context),
  infra: infraStores(context),
  auth: authStores(context),
  gitHub: gitHubStore(context),
  gitLab: gitLabStore(context),
  router: routerStore(context),
};

createStyles(context);

BauRouter({
  routes: createRoutes({ context }),
  onLocationChange: onLocationChange({
    context,
    LayoutDefault: layoutDefault(context),
    config,
  }),
  notFoundRoute: notFoundRouteDefault(context),
});
