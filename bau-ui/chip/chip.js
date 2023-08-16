import classNames from "@grucloud/bau-css/classNames.js";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";

export default function (context, options) {
  const { bau, css } = context;
  const { span } = bau.tags;

  const className = css`
    display: inline-block;
    border-radius: var(--global-radius);
    padding: 0.2rem 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: smaller;
    &.clickable {
      cursor: pointer;
    }
    &.sm {
      padding: 0.2rem;
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.5rem;
    }
  `;

  return function Chip(...args) {
    let [
      {
        size = "md",
        variant = "outline",
        color = "neutral",
        onclick,
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);

    return span(
      {
        ...props,
        onclick,
        class: classNames(
          "chip",
          className,
          size,
          variant,
          color,
          onclick && "clickable",
          options?.class,
          props?.class
        ),
      },
      ...children
    );
  };
}
