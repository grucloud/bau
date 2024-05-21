import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import { Colors } from "../constants.js";

export default function (context, options = {}) {
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
    border: none;
    ${colorsToCss()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;

  return function Calendar(...args) {
    let [
      {
        size = options.size ?? "md",
        variant = options.variant ?? "plain",
        color = options.color ?? "neutral",
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);
    return input(
      {
        ...props,
        type: "date",
        class: [
          "calendar",
          className,
          color,
          variant,
          size,
          options?.class,
          props?.class,
        ],
      },
      ...children
    );
  };
}
