import { beforeEach, describe, it, assert } from "vitest";

import Bau from "../bau";

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
  it("push", () => {
    const state = bau.state([]);
    assert.equal(state.val.length, 0);
    // Push one
    state.val.push("banana");
    assert.equal(state.val.length, 1);
    assert.equal(state.val[0], "banana");
    // Push multiple
    state.val.push("mango", "grape");
    assert.equal(state.val.length, 3);
    assert.equal(state.val[2], "grape");
  });
  it("pop", () => {
    // pop: remove the last element
    const state = bau.state(["banana", "apple", "mango"]);
    state.val.pop();
    assert.equal(state.val.length, 2);
  });
  it("shift", () => {
    // remove the first element
    const state = bau.state(["banana", "apple", "mango"]);
    state.val.shift();
    assert.equal(state.val.length, 2);
    assert.equal(state.val[0], "apple");
  });
  it("unshift", () => {
    // unshift: add item at the front
    const state = bau.state(["banana", "mango"]);
    state.val.unshift("apple");
    assert.equal(state.val.length, 3);
    assert.equal(state.val[0], "apple");

    // unshift: add item at the front
    state.val.unshift("ananas", "melon");
    assert.equal(state.val.length, 5);
    assert.equal(state.val[0], "ananas");
    assert.equal(state.val[1], "melon");
  });
  it("splice: remove one item", () => {
    const state = bau.state(["banana", "apple", "mango"]);
    state.val.splice(1, 1);
    assert.equal(state.val.length, 2);
    assert.equal(state.val[1], "mango");
  });
  it("splice: remove the last 2", () => {
    const state = bau.state(["banana", "apple", "mango"]);
    state.val.splice(-2, 2);
    assert.equal(state.val.length, 1);
    assert.equal(state.val[0], "banana");
  });
  it("sort", () => {
    const state = bau.state(["banana", "apple"]);
    state.val.sort();
    assert.equal(state.val[0], "apple");
  });
  it("reverse", () => {
    const state = bau.state(["banana", "apple"]);
    state.val.reverse();
    assert.equal(state.val[0], "apple");
  });
});
