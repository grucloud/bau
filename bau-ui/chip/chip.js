import { toPropsAndChildren } from "@grucloud/bau/bau.js";

export default function (context, options = {}) {
  const { bau, css } = context;
  const { span } = bau.tags;

  const className = css`
    display: inline-flex;
    align-items: center;
    flex-grow: 0;
    box-sizing: border-box;
    gap: 0.5rem;
    border-radius: var(--global-radius);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &.clickable {
      cursor: pointer;
    }
    &.sm {
      padding: 0rem 0.4rem;
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
        size = options.size ?? "md",
        variant = options.variant ?? "outline",
        color = options.color ?? "neutral",
        onclick,
        ...props
      },
      children,
    ] = toPropsAndChildren(args);

    return span(
      {
        ...props,
        onclick,
        class: [
          "chip",
          options.class,
          size,
          variant,
          color,
          onclick && "clickable",
          className,
          props.class,
        ],
      },
      children
    );
  };
}
