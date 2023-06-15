import Bau from "@grucloud/bau";

const bau = Bau();

const { button, span } = bau.tags;

const counter = bau.state(0);

function Counter() {
  return span(
    "❤️ ",
    counter,
    " ",
    button({ onclick: () => ++counter.val }, "👍"),
    button({ onclick: () => --counter.val }, "👎")
  );
}

document.getElementById("app").replaceChildren(Counter());
