import classNames from "@grucloud/bau-css/classNames";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";

export default function (context, options) {
  const { bau, css } = context;
  const { div } = bau.tags;

  const className = css`
    display: inline-flex;
    border-radius: var(--global-radius);
    border-style: solid;
    border-color: var(--color-emphasis-500);
    & button {
      border-radius: 0;
      border: none;
      border-right: 1px solid var(--color-emphasis-400);
      color: inherit;
      font-size: inherit;
    }
    & button:last-child {
      border-radius: 0;
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
