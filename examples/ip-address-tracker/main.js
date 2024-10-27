import Bau from "@grucloud/bau";
import BauCss from "@grucloud/bau-css";
import ipAddressTracker from "./ipAddressTracker";

import "./style.css";

const context = {
  bau: Bau(),
  ...BauCss(),
};

const app = (context) => {
  const { bau, css } = context;
  const { main } = bau.tags;

  const IpAddressTracker = ipAddressTracker(context);

  return function () {
    return main(IpAddressTracker());
  };
};

const App = app(context);
document.getElementById("app").replaceChildren(App());
