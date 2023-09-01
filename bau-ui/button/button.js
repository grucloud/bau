import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames.js";

export default function (context, options = {}) {
  const { bau, css } = context;

  const className = css`
    color: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-width: 2rem;
    min-height: 2rem;
    border: none;
    border-radius: var(--global-radius);
    font-weight: var(--font-weight-semibold);
    text-align: center;
    text-decoration: none;
    overflow: hidden;
    box-sizing: border-box;
    user-select: none;
    transition: all var(--transition-slow);
    cursor: pointer;
    &.outline,
    &.solid {
      box-shadow: var(--shadow-m);
    }
    &.outline:hover,
    &.solid:hover {
      box-shadow: var(--shadow-lg);
    }
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
    &:hover.solid {
      filter: brightness(var(--brightness-hover-always));
    }
    &.button:disabled {
      filter: grayscale(1) brightness(var(--brightness-hover));
      cursor: not-allowed;
      pointer-events: none;
    }
    &.sm {
      padding: 0.3rem;
    }
    &.md {
      padding: 0.2rem 0.8rem;
    }
    &.lg {
      padding: 0.2rem 2rem;
    }
    & i {
      font-style: normal;
    }
  `;

  return function Button(...args) {
    let [{ color, variant, size = "md", href, ...props }, ...children] =
      toPropsAndChildren(args);

    const tagButton = href ? bau.tags.a : bau.tags.button;

    return tagButton(
      {
        ...(!href && { type: "button" }),
        ...props,
        class: classNames(
          "button",
          options.class,
          options.variant,
          options.size,
          options.color,
          variant,
          size,
          color,
          className,
          props.class
        ),
        href,
      },
      children
    );
  };
}
