import "./style.css";
import Bau from "@grucloud/bau";
//import Bau from "../../bau/src/bau";

const bau = Bau();

const { a, button, div, h1, ul, option, input, datalist } = bau.tags;

const App = () => {
  return div(
    h1("Playground"),
    input({
      list: "ice-cream-flavors",
      id: "ice-cream-choice",
      name: "ice-cream-choice",
    }),
    datalist(
      { id: "ice-cream-flavors" },
      option({ value: "Chocolate" }),
      option({ value: "Coconut" }),
      option({ value: "Mint" }),
      option({ value: "Strawberry" }),
      option({ value: "Vanilla" })
    )
  );
};

const app = document.getElementById("app");
app.replaceChildren(App({}));
