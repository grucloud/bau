import assert from "assert";
import { describe, it, vi, expect } from "vitest";

import Bau from "../Bau/src/bau";
import BauCss from "../src/bau-css";

const bau = Bau();
const { div, p, button } = bau.tags;

const bauCss = BauCss();
const { css } = bauCss;

const countState = bau.state(0);

const Counter = () =>
  div(
    p(
      {
        class: css`
          color: red;
        `,
      },
      "Counter: ",
      countState
    )
  );

describe("BauCSS", async () => {
  it("div", () => {
    document.body.appendChild(Counter());
  });
});
