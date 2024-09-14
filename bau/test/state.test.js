import { beforeEach, describe, it, assert } from "vitest";

import Bau from "../bau";

describe("state", async () => {
  const bau = Bau();

  it("string", () => {
    const state = bau.state("foo");
    assert.equal(state.val, "foo");
    state.val = "bar";
  });
  it("number", () => {
    const state = bau.state(0);
    assert.equal(state.val, 0);
    state.val = 1;
  });
  it("boolean", () => {
    const state = bau.state(false);
    assert.equal(state.val, false);
    state.val = true;
  });
});
