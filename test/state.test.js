import assert from "assert";
import { beforeEach, describe, it, vi } from "vitest";

import Bau from "../src/bau";

describe("state", async () => {
  const bau = Bau();

  it("string", () => {
    const state = bau.state("foo");
    assert.equal(state.val, "foo");
  });
  it("number", () => {
    const state = bau.state(0);
    assert.equal(state.val, 0);
  });
  it("boolean", () => {
    const state = bau.state(false);
    assert.equal(state.val, false);
  });
  it("array empty", () => {
    const state = bau.state([]);
    assert(Array.isArray(state.val));
  });
  it("array not empty", () => {
    const state = bau.state([1]);
    assert(Array.isArray(state.val));
    assert.equal(state.val[0], 1);
  });
});
