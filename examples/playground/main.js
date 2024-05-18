import "./style.css";
import Bau from "@grucloud/bau";

const bau = Bau();
const { button, div, h1 } = bau.tags;

const App = () => {
  const appState = bau.state({
    label: "Ciao",
    address: { city: "barranquilla" },
  });

  return div(
    h1("Playground"),
    button(
      {
        onclick: () => {
          appState.val.label = "Ciao Mondo";
        },
        class: "myclass",
      },
      "Set nested"
    ),
    button(
      {
        onclick: () => {
          appState.val.address.city = "Fortaleza";
        },
        class: "myclass",
      },
      "Deep nested"
    ),
    () =>
      div(
        div("Label: ", appState.val.label),
        div("City: ", appState.val.address.city)
      )
  );
};

const app = document.getElementById("app");
app.replaceChildren(App({}));
