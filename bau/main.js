import Bau from "./bau";

const bau = Bau({});

const { a, button, div, ul, li, input, span } = bau.tags;

const App = () => {
  return div("Welcome to Bau");
};

const app = document.getElementById("app");
app.replaceChildren(App({}));
