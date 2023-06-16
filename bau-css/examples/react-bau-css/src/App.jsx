import { useState } from "react";
import BauCss from "@grucloud/bau-css";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

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

const classLogoReact = css`
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
  a:nth-of-type(2) .${classLogoReact} {
    animation: ${logoSpin} infinite 20s linear;
  }
}
#root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  --main-color: hotpink;
}
@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
`;

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className={classLogo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className={`${classLogo} ${classLogoReact}`}
            alt="React logo"
          />
        </a>
      </div>
      <h1>React + BauCss</h1>
      <div
        className={css`
          padding: 2em;
        `}
      >
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p
        className={css`
          color: var(--main-color);
        `}
      >
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
