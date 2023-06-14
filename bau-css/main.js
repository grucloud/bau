import Bau from "../bau/src/bau";
import BauCss from "./src/bau-css";

const bau = Bau({});
const { p, h1, div } = bau.tags;

const bauCss = BauCss();
const { css, keyframes } = bauCss;

const color = "red";

const rotate = keyframes`
0% {transform: rotate(0deg);}
100% {transform: rotate(360deg);}
`;

const App = () =>
  div(
    {
      class: css`
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
      `,
    },
    h1("Hello BauCss"),
    p("Hover over the title to start the animation")
  );

document.getElementById("app").replaceChildren(App({}));
