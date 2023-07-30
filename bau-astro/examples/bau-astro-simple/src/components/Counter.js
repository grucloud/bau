import context from "./context";
const { bau } = context;
const { button, span } = bau.tags;
const counter = bau.state(0);

export default function Counter() {
  console.log("Counter");
  return span(
    "❤️ ",
    counter,
    " ",
    button({ onclick: () => ++counter.val }, "👍"),
    button({ onclick: () => --counter.val }, "👎")
  );
}
