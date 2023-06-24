import "./style.css";
import Bau from "@grucloud/bau";
const bau = Bau();
const { div, h1, ul, li } = bau.tags;

const App = () =>
  div(
    h1({ class: "text-3xl font-bold underline text-gray-500" }, "Bau Tailwind")
  );

const app = document.getElementById("app");
app?.replaceChildren(App());
