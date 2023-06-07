import assert from "assert";
import { describe, it, vi, expect } from "vitest";

import Bau from "../src/bau";

describe("tags", async () => {
  const bau = Bau();
  const { div, p, button } = bau.tags;
  it("div", () => {
    const el = div("hello", " ", "world");
    assert.equal(el.outerHTML, "<div>hello world</div>");
  });
  it("p", () => {
    const el = p("hello");
    assert.equal(el.outerHTML, "<p>hello</p>");
  });
  it("p with props", () => {
    const el = p({ style: "border: 1px solid" }, "hello");
    assert.equal(el.outerHTML, '<p style="border: 1px solid;">hello</p>');
  });
  it("button", () => {
    const spyClick = vi.fn();
    const el = button({ id: "my-button", onclick: spyClick }, "Click");
    document.body.replaceChildren(el);
    document.getElementById("my-button").click();
    expect(spyClick).toHaveBeenCalled();
  });
});
