import { describe, vi, it, assert, expect } from "vitest";

const sleep = (ms = 50) => new Promise((resolve) => setTimeout(resolve, ms));

import Bau from "../bau";

describe("object", async () => {
  const bau = Bau();
  const { div, button, pre } = bau.tags;

  const state = bau.state({ name: "", surname: "" });
  const spyRender = vi.fn();

  const TestComponent = () =>
    div(
      pre({ id: "object-value" }, () => {
        spyRender();
        return JSON.stringify(state.val);
      }),
      button(
        {
          id: "my-button",
          onclick: () => {
            state.val.name = "john";
            state.val.surname = "doe";
          },
        },
        "Click"
      )
    );

  it("click", async () => {
    const el = TestComponent();
    document.body.appendChild(el);
    let value = document.getElementById("object-value");
    assert.equal(value.innerText, '{"name":"","surname":""}');
    expect(spyRender).toHaveBeenCalledTimes(1);

    document.getElementById("my-button").click();
    await sleep();
    assert.equal(value.innerText, '{"name":"john","surname":"doe"}');
    expect(spyRender).toHaveBeenCalledTimes(2);

    document.body.removeChild(el);
  });
});
