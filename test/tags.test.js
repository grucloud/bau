import assert from "assert";
import { beforeEach, describe, it, vi } from "vitest";

import Bau from "../src/bau";

describe("tags", async () => {
  const bau = Bau();

  it("div", () => {
    const { div } = bau.tags;
    const el = div("hello", " ", "world");
    assert.equal(el.outerHTML, "<div>hello world</div>");
  });
});
