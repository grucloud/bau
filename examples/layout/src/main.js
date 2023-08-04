import Bau from "@grucloud/bau";

import app from "./App";

const context = {
  bau: Bau(),
};

const App = app(context);
document.getElementById("app")?.replaceChildren(App());
