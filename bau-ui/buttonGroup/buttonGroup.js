import classNames from "@grucloud/bau-css/classNames.js";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import { Colors } from "../constants";

const colorsToCss = () =>
  Colors.map(
    (color) =>
      `
&.button-group.${color} {
  & button { 
    border-right-color: var(--color-${color});
  }
}
&.button-group.solid.${color} {
  & button { 
    border-right-color: var(--color-emphasis-100);
  }
}
`
  ).join("\n");

export default function (context, options) {
  const { bau, css } = context;
  const { div } = bau.tags;

  const className = css`
    display: inline-flex;
    border-radius: var(--global-radius);
    & button {
      border-radius: 0;
      border-right: 1px solid var(--color-emphasis-400);
      color: inherit;
      font-size: inherit;
    }
    & button:last-child {
      border: none;
    }
    &.sm {
      & button {
        font-size: 0.7rem;
      }
    }
    &.md {
      font-size: 1rem;
    }
    &.lg {
      & button {
        font-size: 1.5rem;
        padding: 1rem;
      }
    }
    ${colorsToCss()}
  `;

  return function ButtonGroup(...args) {
    let [{ variant = "outline", size = "md", color, ...props }, ...children] =
      toPropsAndChildren(args);

    return div(
      {
        ...props,
        class: classNames(
          "button-group",
          className,
          variant,
          color,
          size,
          options?.class,
          props?.class
        ),
      },
      ...children
    );
  };
}
