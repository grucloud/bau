import "./style.css";
import Bau from "@grucloud/bau";
const bau = Bau();
const { div, h1 } = bau.tags;

const MyEditor = () => {};
const App = () => div(h1("Bau ACE Editor"));

const app = document.getElementById("app");
app?.replaceChildren(App());
