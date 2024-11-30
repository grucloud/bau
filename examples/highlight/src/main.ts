import "./style.css";
import Bau from "@grucloud/bau";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import highlighter from "./highlighter";

hljs.registerLanguage("javascript", javascript);

const bau = Bau();
const { div, h1, h2, pre, p, a } = bau.tags;

const Highlighter = highlighter({ bau });

const highlightedText = `
import Bau from "@grucloud/bau";
`;

const HighlighContainer = ({ text }: any) =>
  pre({
    bauCreated: ({ element }: any) => {
      element.innerHTML = hljs.highlight(text, {
        language: "js",
      }).value;
    },
  });

const href = "https://raw.githubusercontent.com/grucloud/bau/main/bau/bau.js";

const App = () => {
  return div(
    h1("highlight.js"),
    h2("Static Content"),
    HighlighContainer({ text: highlightedText }),
    h2("Dynamic loading Syntax"),
    p("Displaying ", a({ href }, href)),
    Highlighter({
      href,
    })
  );
};

const app = document.getElementById("app");
app?.replaceChildren(App());
