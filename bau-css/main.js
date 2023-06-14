//import { css } from "../../goober/src/css";

import Bau from "../bau/src/bau";

import BauCss from "./src/bau-css";

const bau = Bau({});
const bauCss = BauCss();
const { css, keyframes } = bauCss;

const { h1, p, div, ul, li, input, span } = bau.tags;

const color = "red";
const borderSize = "2px";

const bounce = keyframes`
    from,
    20%,
    53%,
    80%,
    to {
      transform: translate3d(0, 0, 0);
    }

    40%,
    43% {
      transform: translate3d(0, -30px, 0);
    }

    70% {
      transform: translate3d(0, -15px, 0);
    }

    90% {
      transform: translate3d(0, -4px, 0);
    }
`;

const App = () => {
  return div(
    div(
      {
        class: css`
          border: yellow solid 3px;

          & > p {
            border: ${color} solid ${borderSize};
          }
        `,
      },
      h1(
        {
          class: css`
            border: ${color} dotted ${borderSize};
            &:hover {
              border: blue solid ${borderSize};
            }
          `,
        },
        "Bau CSS in JS"
      ),

      p(
        {
          class: css`
            //animation: ${bounce} 1s infinite;
            color: blue;
          `,
        },
        "40 lines of code"
      ),
      p(
        {
          class: css`
            &:hover {
              color: green;
            }
            color: blue;
          `,
        },
        "So tiny"
      )
    )
  );
};

const app = document.getElementById("app");
app.replaceChildren(App({}));
