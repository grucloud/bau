import "./style.css";
import Bau from "@grucloud/bau";

const bau = Bau();
const { div, h1, pre } = bau.tags;

const HighlighContainer = () =>
  pre(
    {
      bauCreated: ({ element }) => {
        element.innerHTML =
          "<div>My html content inserted through innerHTML</div>";
        // element.parentElement is null
        // element.scrollHeight is 0
      },
      bauMounted: ({ element }) => {
        element.style.height = "50px";
        element.style.border = "1px dotted red";
      },
    },
    "My content"
  );

const App = () => {
  return div(h1("Bau Lifecycle"), HighlighContainer());
};

const app = document.getElementById("app");
app?.replaceChildren(App());
