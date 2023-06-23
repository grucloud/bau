import "./style.css";
import Bau from "@grucloud/bau";

import { makeHistogram } from "./histogram";
import { SOSurvey } from "./soSurvey";

const bau = Bau();
const { div, h1 } = bau.tags;
const { svg } = bau.tagsNS("http://www.w3.org/2000/svg");

const App = () =>
  div(
    h1("Bau integration with D3"),
    div(
      {
        id: "container",
        bauMounted: () => {
          makeHistogram({ id: "container", sample: SOSurvey });
        },
      },
      svg()
    )
  );

const app = document.getElementById("app");
app?.replaceChildren(App());
