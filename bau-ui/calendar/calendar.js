import classNames from "@grucloud/bau-css/classNames";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import { Colors } from "../constants";

export default function (context, options) {
  const { bau, css } = context;
  const { input } = bau.tags;

  const colorsToCss = () =>
    Colors.map(
      (color) =>
        `
&.calendar.${color} {
  accent-color: var(--color-${color});
}
`
    ).join("\n");

  const className = css`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    ${colorsToCss()}
  `;

  return function Calendar(...args) {
    let [
      { color = "neutral", variant = "plain", size, ...props },
      ...children
    ] = toPropsAndChildren(args);
    return input(
      {
        ...props,
        type: "date",
        class: classNames(
          "calendar",
          className,
          color,
          variant,
          size,
          options?.class,
          props?.class
        ),
      },
      ...children
    );
  };
}
