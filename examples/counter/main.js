import "./style.css";
//import Bau from "@grucloud/bau";
import Bau from "../../bau/src/bau";

const bau = Bau();

const { button, span } = bau.tags;

function Counter() {
  const counter = bau.state(0);
  return span(
    "❤️ ",
    counter,
    " ",
    button({ onclick: () => ++counter.val }, "👍"),
    button({ onclick: () => --counter.val }, "👎")
  );
}

document.getElementById("app").replaceChildren(Counter());
