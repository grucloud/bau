import classNames from "@grucloud/bau-css/classNames.js";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";

export default function (context, options = {}) {
  const { bau, css } = context;
  const { span } = bau.tags;

  const className = css`
    display: inline-block;
    box-sizing: border-box;
    border-radius: var(--global-radius);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &.clickable {
      cursor: pointer;
    }
    &.sm {
      padding: 0.2rem;
    }
    &.md {
      padding: 0.2rem 0.5rem;
    }
    &.lg {
      padding: 0.3rem 1rem;
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
          options.class,
          options.variant,
          options.size,
          options.color,
          size,
          variant,
          color,
          onclick && "clickable",
          className,
          props.class
        ),
      },
      ...children
    );
  };
}
