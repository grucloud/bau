import { vi, describe, it, assert, expect } from "vitest";

const sleep = (ms = 50) => new Promise((resolve) => setTimeout(resolve, ms));

import Bau from "../bau";

describe("derive", async () => {
  const bau = Bau();
  const { p } = bau.tags;
  it("basic", async () => {
    const a = bau.state(1);
    const b = bau.derive(() => a.val + 1);
    assert.equal(a.val, 1);
    assert.equal(b.val, 2);
    a.val++;
    await sleep();
    assert.equal(a.val, 2);
    assert.equal(b.val, 3);
  });
  it("basic with dom", async () => {
    const a = bau.state(1);
    const b = bau.derive(() => a.val + 1);
    assert.equal(a.val, 1);
    assert.equal(b.val, 2);
    const el = p(p(a), p(b));
    assert.equal(el.outerHTML, "<p><p>1</p><p>2</p></p>");
    a.val++;
    await sleep();
    assert.equal(a.val, 2);
    assert.equal(b.val, 3);
    assert.equal(el.outerHTML, "<p><p>2</p><p>3</p></p>");
  });
  it("derive cascade", async () => {
    const a = bau.state(2);
    const spyb = vi.fn();
    const b = bau.derive(() => {
      spyb();
      return Math.pow(a.val, 2);
    });
    const spyc = vi.fn();
    const c = bau.derive(() => {
      spyc();
      return Math.pow(b.val, 2);
    });
    assert.equal(a.val, 2);
    assert.equal(b.val, 4);
    assert.equal(c.val, 16);

    expect(spyb).toHaveBeenCalledTimes(1);
    expect(spyc).toHaveBeenCalledTimes(1);

    a.val = 3;
    await sleep();
    assert.equal(a.val, 3);
    assert.equal(b.val, 3 * 3);
    assert.equal(c.val, 9 * 9);
    expect(spyb).toHaveBeenCalledTimes(2);
    expect(spyc).toHaveBeenCalledTimes(2);
  });

  it("derive once", async () => {
    const a = bau.state(1);
    const b = bau.state(1);
    const spys = vi.fn();
    const s = bau.derive(() => {
      spys();
      return a.val + b.val;
    });

    expect(spys).toHaveBeenCalledTimes(1);

    ++a.val;
    ++b.val;
    await sleep();
    assert.equal(a.val, 2);
    assert.equal(b.val, 2);
    assert.equal(s.val, 4);
    expect(spys).toHaveBeenCalledTimes(2);
  });
  it("derive of derive", async () => {
    const a = bau.state(1);
    const b = bau.derive(() => a.val + 1);
    const spys = vi.fn();
    const sum = bau.derive(() => {
      spys();
      return a.val + b.val;
    });

    expect(spys).toHaveBeenCalledTimes(1);

    ++a.val;
    await sleep();
    assert.equal(a.val, 2);
    assert.equal(b.val, 3);
    assert.equal(sum.val, 5);
    expect(spys).toHaveBeenCalledTimes(2);
  });

  it("set and get", async () => {
    const a = bau.state(false);
    const b = bau.state(0);
    const spys = vi.fn();

    bau.derive(() => {
      spys();
      if (a.val) {
        b.val++;
      }
    });

    expect(spys).toHaveBeenCalledTimes(1);

    a.val = true;
    await sleep();
    assert.equal(b.val, 1);
    expect(spys).toHaveBeenCalledTimes(2);
  });

  it("updates incrementally", () => {
    const a = bau.state(false);
    const b = bau.state(false);
    const derived = bau.derive(() => {
      if (!a.val) return 1;
      if (!b.val) return 2;
      return 3;
    });

    assert.equal(derived.val, 1);
    a.val = true;
    assert.equal(derived.val, 2);
    b.val = true;
    assert.equal(derived.val, 3);
  });

  it("updates when first null", () => {
    const a = bau.state(false);
    const b = bau.state(false);
    const derived = bau.derive(() => {
      if (!a.val) return null;
      if (!b.val) return null;
      return true;
    });

    assert.equal(derived.val, null);
    a.val = true;
    b.val = true;
    assert.equal(derived.val, true);
  });
});
