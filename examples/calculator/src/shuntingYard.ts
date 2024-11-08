import { TOKEN_TYPE, Token } from "./parser";
import BN from "bignumber.js";

const OperatorMap: Record<string, number> = {
  "/": 4,
  "*": 3,
  "+": 2,
  "-": 2,
};

const getPrecedence = (token: Token) => OperatorMap[token.value];

// Returns the Reversed Polished Notation
export const buildRPN = (tokens: Token[]) => {
  const output: Token[] = [];
  const stack: Token[] = [];

  tokens.forEach((token) => {
    if (token.type == TOKEN_TYPE.NUMERIC) {
      output.push(token);
    } else if (token.type == TOKEN_TYPE.OPERATOR) {
      while (stack.length > 0) {
        const itToken = stack[0];
        if (getPrecedence(itToken) >= getPrecedence(token)) {
          stack.shift();
          output.push(itToken);
        } else {
          break;
        }
      }
      stack.unshift(token);
    }
  });
  while (stack.length > 0) {
    const toMove = stack.shift();
    if (toMove) {
      output.push(toMove);
    }
  }

  return output;
};

export const compute = (tokens: Token[]) => {
  const results: BN[] = [];
  let error;
  tokens.every((token) => {
    if (token.type == TOKEN_TYPE.NUMERIC) {
      results.unshift(BN(token.value));
    } else if (token.type == TOKEN_TYPE.OPERATOR) {
      const op = token.value;
      // Assume operators consumes 2 operands
      const operand2 = results.shift();
      if (!operand2) {
        error = "missing operand";
        return false;
      }
      const operand1 = results.shift();
      if (!operand1) {
        error = "missing operand";
        return false;
      }
      let result;
      switch (op) {
        case "*": {
          result = operand1.times(operand2);
          break;
        }
        case "/": {
          result = operand1.dividedBy(operand2);
          break;
        }
        case "+": {
          result = operand1.plus(operand2);
          break;
        }
        case "-": {
          result = operand1.minus(operand2);
          break;
        }
      }
      if (result) {
        results.unshift(result);
      }
    }
    return true;
  });
  let resultValue;
  if (results.length == 1) {
    resultValue = results[0];
  }
  return { results, error, resultValue };
};
