import "./style.css";
import Bau from "@grucloud/bau";

const bau = Bau();
const { div, h1, li, ul, button } = bau.tags;

const showState = bau.state(true);
const scrollState = bau.state(0);

const handleScroll = () => {
  console.log("scroll");
  scrollState.val = window.scrollY;
};

const App = () => {
  return div(
    h1("Bau Lifecycle"),
    bau.bind({
      deps: [scrollState],
      render: () => (scroll) => div("scroll: ", scroll),
    }),
    button(
      {
        onclick: () => {
          showState.val = !showState.val;
        },
      },
      "Toogle scroll detection"
    ),
    bau.bind({
      deps: [showState],
      render: () => (show) =>
        show
          ? div(
              {
                bauMounted: ({ element }) => {
                  console.log("bauMounted", element.tagName);
                  window.addEventListener("scroll", handleScroll);
                },
                bauUnmounted: ({ element }) => {
                  console.log("bauUnMounted", element.tagName);
                  window.removeEventListener("scroll", handleScroll);
                },
              },
              "listening to scroll"
            )
          : undefined,
    }),
    ul([...Array(30)].map((_, i) => li(i)))
  );
};

const app = document.getElementById("app");
app?.replaceChildren(App());
