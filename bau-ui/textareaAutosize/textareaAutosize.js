import { Colors } from "../constants.js";

const colorsToCss = () =>
  Colors.map(
    (color) =>
      `
`
  ).join("\n");

// Inspired by https://css-tricks.com/auto-growing-inputs-textareas/#aa-other-ideas

export default function (context, options = {}) {
  const { bau, css } = context;
  const { textarea, div } = bau.tags;

  const oninput = (event) => {
    event.target.parentNode.dataset.value = event.target.value;
  };

  return function TextareaAutosize({
    size = options.size ?? "md",
    color = options.color ?? "primary",
    variant = options.variant ?? "outline",
    ...otherProps
  } = {}) {
    const className = css`
      ${colorsToCss()}
      display: inline-grid;
      &::after,
      textarea {
        grid-area: 1 / 1;
        font: inherit;
        padding: 0.25em;
      }
      &::after {
        content: attr(data-value) " ";
        visibility: hidden;
        white-space: pre-wrap;
      }
    `;

    return div(
      { class: ["textarea-autosize", className] },
      textarea({
        ...otherProps,
        oninput,
      })
    );
  };
}
