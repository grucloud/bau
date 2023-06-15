import "./style.css";
import Bau from "@grucloud/bau";

const bau = Bau();

const app = ({ bau }) => {
  const { section, h1 } = bau.tags;
  const { math, mi, mn, mo, mrow, msup } = bau.tagsNS(
    "http://www.w3.org/1998/Math/MathML"
  );
  return function App() {
    return section(
      h1("Euler"),
      math(
        msup(mi("e"), mrow(mi("i"), mi("π"))),
        mo("+"),
        mn("1"),
        mo("="),
        mn("0")
      ),
      h1("Bau view function"),
      math(
        mi("view"),
        mo("="),
        mi("f"),
        mo({ strechy: false }, "("),
        mi("state"),
        mo({ strechy: false }, ")")
      )
    );
  };
};

document.getElementById("app").replaceChildren(app({ bau })());
