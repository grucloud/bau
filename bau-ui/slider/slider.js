import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames";
import { Colors } from "../constants";

export default function (context, options) {
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
      { color = "neutral", variant = "outline", size, ...props },
      ...children
    ] = toPropsAndChildren(args);

    return input(
      {
        ...props,
        type: "range",
        class: classNames(
          "slider",
          color,
          variant,
          size,
          className,

          options?.class,
          props.class
        ),
      },
      ...children
    );
  };
}
