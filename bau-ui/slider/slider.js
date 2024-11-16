import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import { Colors } from "../constants.js";

export default function (context, options = {}) {
  const { bau, css } = context;
  const { input } = bau.tags;

  const colorsToCss = () =>
    Colors.map(
      (color) =>
        `
&.slider.${color} {
  accent-color: var(--color-${color});
}
`
    ).join("\n");

  const className = css`
    ${colorsToCss()};
  `;

  return function Slider(...args) {
    let [
      {
        size = options.size ?? "md",
        variant = options.variant ?? "plain",
        color = options.color ?? "neutral",
        ...props
      },
      children,
    ] = toPropsAndChildren(args);

    return input(
      {
        ...props,
        type: "range",
        class: [
          "slider",
          color,
          variant,
          size,
          className,
          options?.class,
          props.class,
        ],
      },
      children
    );
  };
}
