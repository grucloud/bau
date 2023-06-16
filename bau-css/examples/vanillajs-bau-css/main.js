import BauCss from "@grucloud/bau-css";
import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

const { css, keyframes, createGlobalStyles } = BauCss();

const classLogo = css`
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
`;

const classVanilla = css`
  :hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }
`;

const logoSpin = keyframes`
from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

createGlobalStyles`
@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .${classVanilla} {
    animation: ${logoSpin} infinite 20s linear;
  }
}

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  --main-color: hotpink;
}
`;

document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="${classLogo}" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="${classLogo} ${classVanilla}" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="${css`
      padding: 2em;
    `}">
      <button id="counter" type="button"></button>
    </div>
    <p class="${css`
      color: var(--main-color);
    `}">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector("#counter"));
