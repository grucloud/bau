import Bau from "@grucloud/bau";
import BauCss from "@grucloud/bau-css";
import bentoGrid from "./bentoGrid";

import "./style.css";

const context = {
  bau: Bau(),
  ...BauCss(),
};

const app = (context) => {
  const { bau, css } = context;
  const { main } = bau.tags;

  const BentoGrid = bentoGrid(context);

  return function () {
    return main(BentoGrid());
  };
};

const App = app(context);
document.getElementById("app").replaceChildren(App());
