import Bau from "@grucloud/bau";
import BauCss from "@grucloud/bau-css";

const bau = Bau({});
const { p, h1, div } = bau.tags;

const bauCss = BauCss();
const { css, keyframes, createGlobalStyles } = bauCss;

const color = "red";

const rotate = keyframes`
0% {transform: rotate(0deg);}
100% {transform: rotate(360deg);}
`;

const classRoot = css`
  border: ${color} dotted 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & h1 {
    &:hover {
      animation: ${rotate} 4s infinite;
    }
  }
`;

createGlobalStyles`
body {
    margin: 0;
    padding: 0;
    background: teal;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;

const App = () =>
  div(
    {
      class: classRoot,
    },
    h1("Hello BauCss"),
    p("Hover over the title to start the animation")
  );

document.getElementById("app").replaceChildren(App({}));
