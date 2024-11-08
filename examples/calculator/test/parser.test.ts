import { beforeEach, describe, it, assert } from "vitest";

import Parser, { TOKEN_TYPE } from "../src/parser";

describe("parser", async () => {
  const parser = Parser();

  beforeEach(() => {
    parser.reset();
  });

  it("1+1=", () => {
    "1+1=".split("").forEach((key) => parser.evKey(key));
    const tokens = parser.evKey("1");
    assert(tokens);
  });
  it("-1+1", () => {
    const tokens = parser.parseFormula("-1+1");
    console.log(JSON.stringify(tokens));
    assert.equal(tokens.length, 3);
    assert.equal(tokens[0].value, "-1");
    assert.equal(tokens[0].type, TOKEN_TYPE.NUMERIC);
    assert.equal(tokens[1].type, TOKEN_TYPE.OPERATOR);
  });
  it("1+2*3", () => {
    const tokens = parser.parseFormula("1+2*3");
    assert.equal(tokens.length, 5);
  });
  it("1.1+0.0", () => {
    const tokens = parser.parseFormula("1.1+0.0");
    assert.equal(tokens.length, 3);
    assert.equal(tokens[0].value, "1.1");
    assert.equal(tokens[0].type, TOKEN_TYPE.NUMERIC);
    assert.equal(tokens[1].type, TOKEN_TYPE.OPERATOR);
  });
  it("1", () => {
    const tokens = parser.parseFormula("1");
    assert.equal(tokens.length, 1);
    assert.equal(tokens[0].value, "1");
  });
  it("/", () => {
    const tokens = parser.parseFormula("/");
    assert.equal(tokens.length, 1);
    assert.equal(tokens[0].value, "/");
  });
});
