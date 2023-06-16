import assert from "assert";
import { describe, it, vi, expect } from "vitest";

import BauCss from "../src/bau-css";

const bauCss = BauCss();
const { css, keyframes, createGlobalStyles } = bauCss;

const classPrefix = "bau";

describe("BauCSS", async () => {
  it("css", () => {
    const color = "red";
    const className = css`
      color: ${color};
    `;
    assert(className.startsWith(classPrefix));
    const styleEl = document.getElementById(className);
    assert.equal(
      styleEl.innerHTML,
      `.bau412773214 { \n      color: red;\n     }`
    );
  });

  it("keyframes", () => {
    const keyframesName = keyframes`
        0% {transform: rotate(0deg);}
        100% {transform: rotate(360deg);}
    `;
    assert(keyframesName.startsWith(classPrefix));
    const styleEl = document.getElementById(keyframesName);
    assert(styleEl);
    assert.equal(
      styleEl.innerHTML,
      "@keyframes bau4055669395 { \n        0% {transform: rotate(0deg);}\n        100% {transform: rotate(360deg);}\n     }"
    );
  });
  it("createGlobalStyles", () => {
    const id = createGlobalStyles`
      body {
          background: teal;
        }
`;
    const styleEl = document.getElementById(id);
    assert(
      styleEl.innerHTML,
      "\n      body {\n          background: teal;\n        }\n"
    );
  });
});
