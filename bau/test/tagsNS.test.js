import { describe, it, assert } from "vitest";

import Bau from "../bau";

describe("tags", async () => {
  const bau = Bau();
  const { tagsNS } = bau;

  it("tagsNSTest_svg", () => {
    const { circle, path, svg } = tagsNS("http://www.w3.org/2000/svg");
    const dom = svg(
      { width: "16px", viewBox: "0 0 50 50" },
      circle({
        cx: "25",
        cy: "25",
        r: "20",
        stroke: "black",
        "stroke-width": "2",
        fill: "yellow",
      }),
      circle({
        cx: "16",
        cy: "20",
        r: "2",
        stroke: "black",
        "stroke-width": "2",
        fill: "black",
      }),
      circle({
        cx: "34",
        cy: "20",
        r: "2",
        stroke: "black",
        "stroke-width": "2",
        fill: "black",
      }),
      path({
        d: "M 15 30 Q 25 40, 35 30",
        stroke: "black",
        "stroke-width": "2",
        fill: "transparent",
      })
    );
    assert.equal(
      dom.outerHTML,
      '<svg width="16px" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" stroke="black" stroke-width="2" fill="yellow"></circle><circle cx="16" cy="20" r="2" stroke="black" stroke-width="2" fill="black"></circle><circle cx="34" cy="20" r="2" stroke="black" stroke-width="2" fill="black"></circle><path d="M 15 30 Q 25 40, 35 30" stroke="black" stroke-width="2" fill="transparent"></path></svg>'
    );
  });
  it("tagsNSTest_math", () => {
    const { circle, path, svg } = tagsNS("http://www.w3.org/2000/svg");
    const dom = svg(
      { width: "16px", viewBox: "0 0 50 50" },
      circle({
        cx: "25",
        cy: "25",
        r: "20",
        stroke: "black",
        "stroke-width": "2",
        fill: "yellow",
      }),
      circle({
        cx: "16",
        cy: "20",
        r: "2",
        stroke: "black",
        "stroke-width": "2",
        fill: "black",
      }),
      circle({
        cx: "34",
        cy: "20",
        r: "2",
        stroke: "black",
        "stroke-width": "2",
        fill: "black",
      }),
      path({
        d: "M 15 30 Q 25 40, 35 30",
        stroke: "black",
        "stroke-width": "2",
        fill: "transparent",
      })
    );
    assert.equal(
      dom.outerHTML,
      '<svg width="16px" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" stroke="black" stroke-width="2" fill="yellow"></circle><circle cx="16" cy="20" r="2" stroke="black" stroke-width="2" fill="black"></circle><circle cx="34" cy="20" r="2" stroke="black" stroke-width="2" fill="black"></circle><path d="M 15 30 Q 25 40, 35 30" stroke="black" stroke-width="2" fill="transparent"></path></svg>'
    );
  });
});
