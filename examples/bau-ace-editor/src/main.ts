import "./style.css";
import Bau from "@grucloud/bau";
const bau = Bau();
const { div, h1 } = bau.tags;

const MyEditor = ({ id }: any) => {
  return div(
    {
      id,
      bauMounted: () => {
        // @ts-ignore
        var editor = window.ace.edit(id);
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/javascript");
      },
    },
    'function foo(items) { var x = "All this is syntax highlighted"; return x;}'
  );
};

const App = () => div(h1("Bau ACE Editor"), MyEditor({ id: "editor" }));

const app = document.getElementById("app");
app?.replaceChildren(App());
