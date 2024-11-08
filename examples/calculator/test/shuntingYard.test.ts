import { beforeEach, describe, it, assert } from "vitest";

import Parser from "../src/parser";
import { buildRPN, compute } from "../src/shuntingYard";

const rpnToString = (tokens) => tokens.map(({ value }) => value).join(" ");

describe("shunting yard", async () => {
  const parser = Parser();

  beforeEach(() => {
    parser.reset();
  });

  it("1+2", () => {
    const rpn = buildRPN(parser.parseFormula("1+2"));
    assert.equal(rpnToString(rpn), "1 2 +");
    assert.equal(compute(rpn).resultValue.toString(), 3);
  });
  it("-1-2-3", () => {
    const rpn = buildRPN(parser.parseFormula("-1-2-3"));
    assert.equal(rpnToString(rpn), "-1 2 - 3 -");
    assert.equal(compute(rpn).resultValue.toString(), "-6");
  });
  it("2*-1", () => {
    const rpn = buildRPN(parser.parseFormula("2*-1"));
    assert.equal(rpnToString(rpn), "2 -1 *");
    assert.equal(compute(rpn).resultValue.toString(), "-2");
  });
  it("1+2+3", () => {
    const rpn = buildRPN(parser.parseFormula("1+2+3"));
    assert.equal(rpnToString(rpn), "1 2 + 3 +");
    assert.equal(compute(rpn).resultValue.toString(), "6");
  });
  it("2-1+3", () => {
    const rpn = buildRPN(parser.parseFormula("2-1+3"));
    assert.equal(rpnToString(rpn), "2 1 - 3 +");
    assert.equal(compute(rpn).resultValue.toString(), 4);
  });
  it("1+2*4", () => {
    const rpn = buildRPN(parser.parseFormula("1+2*4"));
    assert.equal(rpnToString(rpn), "1 2 4 * +");
    assert.equal(compute(rpn).resultValue.toString(), "9");
  });
  it("4/2", () => {
    const rpn = buildRPN(parser.parseFormula("4/2"));
    assert.equal(rpnToString(rpn), "4 2 /");
    assert.equal(compute(rpn).resultValue.toString(), "2");
  });
  it("4/2*2", () => {
    const rpn = buildRPN(parser.parseFormula("4/2*2"));
    assert.equal(rpnToString(rpn), "4 2 / 2 *");
    assert.equal(compute(rpn).resultValue.toString(), "4");
  });
  it("minus", () => {
    const rpn = buildRPN(parser.parseFormula("-"));
    assert.equal(rpnToString(rpn), "-");
    assert.equal(compute(rpn).resultValue.toString(), "NaN");
  });
  it("1*-.2", () => {
    const rpn = buildRPN(parser.parseFormula("1*-.2"));
    assert.equal(rpnToString(rpn), "1 -.2 *");
    assert.equal(compute(rpn).resultValue.toString(), "-0.2");
  });
});
