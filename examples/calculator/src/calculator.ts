import { type Context } from "@grucloud/bau-ui/context";
import themeSwitcher from "./themeSwitcher";
import Parser, { Token } from "./parser";
import { compute, buildRPN } from "./shuntingYard";
import BN from "bignumber.js";

const locale = "US";
const symbols = [
  ["7"],
  ["8"],
  ["9"],
  ["DEL", "del"],
  ["4"],
  ["5"],
  ["6"],
  ["+", "add"],
  ["1"],
  ["2"],
  ["3"],
  ["-", "minus"],
  [".", "dot"],
  ["0"],
  ["/", "divide"],
  ["*", "multiply"],
  ["RESET", "reset"],
  ["=", "equal"],
];

const formatNumber = (num: string) => {
  const formatted = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 50,
  }).format(Number(num));
  return formatted.length < num.length ? num : formatted;
};

export default function (context: Context) {
  const { bau, css, window } = context;
  const { h1, article, header, section, button, div } = bau.tags;

  const tokensState = bau.state<Token[]>([]);
  const rpn = bau.derive(() => buildRPN(tokensState.val));
  // const rpnString = bau.derive(() =>
  //   rpn.val.map(({ value }) => value).join(" ")
  // );
  const result = bau.derive(() => {
    const resultValue = compute(rpn.val).resultValue;
    if (resultValue) {
      if (!resultValue.isNaN()) {
        return formatNumber(resultValue.toString());
      }
    }
  });

  const operandCurrent = bau.derive(() =>
    tokensState.val.reduce(
      (acc, { value }) =>
        BN(value).isNaN() ? acc.concat(value) : acc.concat(formatNumber(value)),
      ""
    )
  );

  const className = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.3rem;
    padding-inline: 1.5rem;
    padding-block: 1rem;
    color: var(--color-text);
    min-height: 100vh;
    > header {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
    }
    > section {
      background-color: var(--secondary-background-color);
      padding: 1rem;
      border-radius: 0.5rem;
    }
    .keypad {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(4, 1fr);
      button {
        font-size: 1.8rem;
        font-weight: 700;
        border: none;
        padding-inline: 1rem;
        padding-block: 0.7rem;
        cursor: pointer;
        border-radius: 0.5rem;
        background: var(--buttons-background-color);
        color: var(--buttons-color-text);
        box-shadow: inset 0px -4px 0px var(--buttons-box-shadow);
        transition: all 0.1s ease-out;
        &:hover {
          background: var(--buttons-background-color-active);
        }
        &:active {
          transform: translateY(1px);
          box-shadow: inset 0px -1px 0px var(--buttons-box-shadow);
        }
      }
      .key-del,
      .key-reset {
        background-color: var(--buttons-secondary-background-color);
        box-shadow: inset 0px -4px 0px var(--buttons-secondary-box-shadow);
        color: #ffffff;
        font-size: 1.2rem;
        &:hover {
          background: var(--buttons-secondary-background-color-active);
        }
      }
      .key-reset {
        grid-column: 1 / span 2;
      }
      .key-equal {
        grid-column: 3 / span 2;
        background-color: var(--ternary-background-color);
        &:hover {
          background: var(--ternary-background-color-active);
        }
        box-shadow: inset 0px -4px 0px var(--buttons-ternary-box-shadow);
        color: #ffffff;
      }
    }
    .display {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-end;
      .operand-previous {
        font-size: 1.2rem;
        height: 2rem;
        color: var(--color-text-secondary);
      }
      .operand-current {
        font-size: 1.7rem;
        height: 2rem;
      }
    }
  `;

  const parser = Parser();

  const equalSign = () => {
    if (result.val != undefined) {
      parser.reset();
      tokensState.val = parser.parseFormula(result.val);
    }
  };

  const onclickSymbol = (symbol: any) => () => {
    if (symbol[0] == "=") {
      equalSign();
    } else {
      tokensState.val = parser.evKey(symbol[0]);
    }
  };

  const onkeydown = (event: any) => {
    if (event.key == "Backspace") {
      tokensState.val = parser.evKey("DEL");
    } else if (event.key == "Escape") {
      parser.reset();
      tokensState.val = [];
    } else if (event.key == "=") {
      equalSign();
    } else {
      tokensState.val = parser.evKey(event.key);
    }
  };

  const ThemeSwitcher = themeSwitcher(context);

  const getKeyName = (symbol: string[]) => symbol[1] ?? symbol[0];

  function textWidth(str: string, fontSize: Number) {
    const span = document.createElement("span");
    span.style.position = "fixed";
    span.style.visibility = "hidden";
    span.style.fontSize = `${fontSize}px`;
    span.innerText = str;
    document.body.appendChild(span);
    const width = Math.round(span.getBoundingClientRect().width);
    span.remove();
    return width;
  }

  const doFontSize = (state: any, fsStart = 20) => {
    let fs = fsStart;
    if (!state.val) {
      return fs;
    }
    const el = document.getElementsByClassName("display")[0];
    if (!el) {
      return fs;
    }
    const width = el.getBoundingClientRect().width;
    while (fs > 8) {
      if (textWidth(state.val, fs) + 50 > width) {
        fs--;
      } else {
        break;
      }
    }
    return fs;
  };

  const fsOperandCurrent = bau.derive(() => doFontSize(operandCurrent, 22));
  const fsResult = bau.derive(() => doFontSize(result, 18));

  return () => {
    return article(
      {
        class: className,
        bauMounted: () => {
          window.document.body.addEventListener("keydown", onkeydown);
        },
        bauUnmounted: () => {
          window.document.removeEventListener("keydown", onkeydown);
        },
      },
      header(h1("Calc"), ThemeSwitcher()),
      section(
        { class: "display" },
        div(
          {
            style: () => `font-size: ${fsResult.val}px`,
            class: "operand-previous",
          },
          result
        ),
        div(
          {
            style: () => `font-size: ${fsOperandCurrent.val}px`,
            class: "operand-current",
          },
          operandCurrent
        )
      ),
      section(
        { class: "keypad" },
        symbols.map((symbol) =>
          button(
            {
              type: "button",
              class: `key-${getKeyName(symbol)}`,
              onclick: onclickSymbol(symbol),
            },
            symbol[0]
          )
        )
      )
    );
  };
}
