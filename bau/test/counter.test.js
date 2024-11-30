import { describe, it, assert, vi, expect } from "vitest";

const sleep = (ms = 50) => new Promise((resolve) => setTimeout(resolve, ms));

import Bau from "../bau";

describe("counter", async () => {
  const bau = Bau();
  const { div, p, button, span } = bau.tags;

  const countState = bau.state(0);

  const Counter = () =>
    div(
      p("Counter: ", span({ id: "counter-value" }, countState)),
      button(
        {
          id: "my-button",
          onclick: () => {
            countState.val++;
          },
        },
        "Click"
      )
    );

  it("click", async () => {
    document.body.appendChild(Counter());
    let counterValue = document.getElementById("counter-value");
    assert.equal(counterValue.innerText, "0");

    document.getElementById("my-button").click();
    await sleep();
    assert.equal(counterValue.innerText, "1");
  });
});
