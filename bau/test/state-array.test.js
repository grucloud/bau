import assert from "assert";
import { beforeEach, describe, it, vi } from "vitest";

import Bau from "../src/bau";

describe("state array", async () => {
  const bau = Bau();
  it("array empty", () => {
    const state = bau.state([]);
    assert(Array.isArray(state.val));
  });
  it("array not empty", () => {
    const state = bau.state([1]);
    assert(Array.isArray(state.val));
    assert.equal(state.val[0], 1);
  });
  it("set one element", () => {
    const state = bau.state([1]);
    state.val[0] = 2;
  });
  it("set brand new array", () => {
    const state = bau.state([1]);
    state.val = [2];
  });
  it("push one", () => {
    const state = bau.state([1]);
    state.val.push(2);
  });
  it("push 2 elements", () => {
    const state = bau.state([1]);
    state.val.push(2, 3);
  });
});
