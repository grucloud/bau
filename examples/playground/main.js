import "./style.css";
//import Bau from "@grucloud/bau";
import Bau from "../../bau/src/bau";

const bau = Bau();
//bau.useVDom(true);
const { a, p, button, div, h1, tr, td, tbody, datalist } = bau.tags;

const Row = ({ label }) => {
  return tr(td(label));
};

const App = () => {
  const appState = bau.state([{ label: "Ciao" }, { label: "Hello" }]);

  const el = div(
    h1("Playground"),
    button(
      {
        onclick: () => {
          appState.val[0].label = "Ciao Mondo";
        },
        class: "myclass",
      },
      "Set nested"
    ),
    button(
      {
        onclick: () => {
          appState.val[0] = { label: "Ciao Mondo" };
        },
      },
      "Set "
    ),
    bau.bind({
      deps: [appState],
      render:
        ({ renderItem }) =>
        (arr) =>
          tbody(arr.map(renderItem())),
      renderItem: () => Row,
    })
  );
  return el;
};

const app = document.getElementById("app");
app.replaceChildren(App({}));
