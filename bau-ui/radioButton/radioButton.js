import classNames from "@grucloud/bau-css/classNames.js";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import { Colors } from "../constants.js";

export default function (context, options = {}) {
  const { bau, css } = context;
  const { input } = bau.tags;

  const colorsToCss = () =>
    Colors.map(
      (color) =>
        `
&.radio-button.${color} {
  accent-color: var(--color-${color});
}
  `
    ).join("\n");

  const className = css`
    &.sm {
      transform: scale(0.8);
    }
    &.md {
    }
    &.lg {
      transform: scale(1.5);
    }
    ${colorsToCss()}
  `;

  return function RadioButton(...args) {
    let [
      {
        size = options.size ?? "md",
        variant = options.variant ?? "plain",
        color = options.color ?? "neutral",
        ...props
      },
    ] = toPropsAndChildren(args);

    return input({
      ...props,
      type: "radio",
      class: classNames(
        "radio-button",
        size,
        color,
        variant,
        className,
        options?.class,
        props?.class
      ),
    });
  };
}
