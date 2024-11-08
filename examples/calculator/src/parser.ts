export const TOKEN_TYPE = { NUMERIC: "NUMERIC", OPERATOR: "OPERATOR" };

const STATES = {
  INIT: "INIT",
  COLLECT_DIGIT: "COLLECT_DIGIT",
  COLLECT_OPERATOR: "COLLECT_OPERATOR",
};

export type Token = {
  value: string;
  type: string;
};

const isDigit = (key: string) => {
  const nkey = Number(key);
  return nkey >= 0 && nkey <= 9 ? true : false;
};

const isDot = (key: string) => key == ".";
const isMinus = (key: string) => key == "-";

const isOperator = (key: string) => ["*", "/", "+", "-", "="].includes(key);
const isDelete = (key: string) => key == "DEL";
const isReset = (key: string) => key == "RESET";

const Parser = () => {
  let _formula = "";
  const parseFormula = (formula: string) => {
    _formula = formula;
    let stateCurrent = STATES.INIT;
    let stateNext = STATES.INIT;
    const tokens: Token[] = [];
    let tokenCurrent: string = "";

    const onTokenNew = (token: Token) => tokens.unshift(token);

    const onTokenUpdate = (token: Token) => {
      if (tokens.length > 0) {
        tokens[0] = token;
      }
    };

    const tokenUpdate = (key: string) => {
      tokenCurrent = tokenCurrent.concat(key);
    };

    const resetToken = () => {
      tokenCurrent = "";
    };

    formula.split("").forEach((key) => {
      stateNext = "";
      switch (stateCurrent) {
        case STATES.INIT: {
          if (isDigit(key) || isDot(key) || isMinus(key)) {
            stateNext = STATES.COLLECT_DIGIT;
          } else if (isOperator(key)) {
            stateNext = STATES.COLLECT_OPERATOR;
          }
          break;
        }
        case STATES.COLLECT_DIGIT: {
          if (isDigit(key) || (isDot(key) && !tokenCurrent.includes("."))) {
            tokenUpdate(key);
            onTokenUpdate({ value: tokenCurrent, type: TOKEN_TYPE.NUMERIC });
          } else if (isOperator(key)) {
            stateNext = STATES.COLLECT_OPERATOR;
          }
          break;
        }
        case STATES.COLLECT_OPERATOR: {
          if (isDigit(key) || isDot(key) || isMinus(key)) {
            stateNext = STATES.COLLECT_DIGIT;
          }
          //Ignore isOperator
          break;
        }
        default: {
          throw Error("Invalid State");
        }
      }
      // On Entry
      switch (stateNext) {
        case STATES.INIT: {
          resetToken();
          break;
        }
        case STATES.COLLECT_DIGIT: {
          tokenUpdate(key);
          onTokenNew({ value: tokenCurrent, type: TOKEN_TYPE.NUMERIC });
          break;
        }
        case STATES.COLLECT_OPERATOR: {
          resetToken();
          onTokenNew({ value: key, type: TOKEN_TYPE.OPERATOR });
          break;
        }
      }
      if (stateNext) {
        stateCurrent = stateNext;
      }
    });
    return tokens.reverse();
  };

  const reset = () => {
    _formula = "";
  };

  return {
    reset,
    parseFormula,
    evKey: (key: string) => {
      if (isReset(key)) {
        reset();
      } else if (isDelete(key)) {
        _formula = _formula.slice(0, -1);
      } else if (isDigit(key) || isDot(key) || isOperator(key)) {
        _formula = _formula.concat(key);
      }
      return parseFormula(_formula);
    },
  };
};

export default Parser;
