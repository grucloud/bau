import "./style.css";
import Bau from "@grucloud/bau";
const bau = Bau();
const { div, h1, ul, li } = bau.tags;

const scrollState = bau.state(0);

const handleScroll = (/*event*/) => (scrollState.val = window.scrollY);

const ScrollNumber = () => () =>
  div({ class: "scroll-number" }, "scroll: ", scrollState.val);

const App = () =>
  div(
    h1("Bau Lifecycle methods"),
    div(
      {
        bauMounted: (/*{ element }*/) => {
          window.addEventListener("scroll", handleScroll);
        },
        bauUnmounted: (/*{ element }*/) => {
          window.removeEventListener("scroll", handleScroll);
        },
      },
      ScrollNumber(),
      ul(new Array(1000).fill("").map((_, index) => li("index ", index)))
    )
  );

const app = document.getElementById("app");
app?.replaceChildren(App());
