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
import infraStores from "./stores/infraStore";
import authStores from "./stores/authStore";
import gitCredentialsStore from "./stores/gitCredentialsStore";
import gitRepositoryStore from "./stores/gitRepositoryStore";
import gitHubStore from "./stores/gitHubStore";
import routerStore from "./stores/routerStore";

const context = createContext({
  config,
});

initialScreenFadeOut();

const AlertStack = alertStack(context, { deleteAfterDuration: 20e3 });
document.getElementById("alert-stack")?.append(AlertStack());

context.rest = rest(context);

context.stores = {
  infra: infraStores(context),
  auth: authStores(context),
  gitCredentials: gitCredentialsStore(context),
  gitRepository: gitRepositoryStore(context),
  gitHub: gitHubStore(context),
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
