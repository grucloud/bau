import { toPropsAndChildren } from "@grucloud/bau/bau.js";

import { Colors } from "../constants.js";

const colorsToCss = () =>
  Colors.map(
    (color) =>
      `
&.button.plain.${color} {
  &:focus {
    outline: 4px auto var(--color-${color});
    border: 1px solid var(--color-neutral);
  };
}
&.button.outline.${color} {
  &:focus {
    outline: 4px auto var(--color-${color});
  };
}
&.button.solid.${color} {
  &:focus {
    outline: 4px auto var(--color-${color}-lightest);
  };
}
`
  ).join("\n");

export default function (context, options = {}) {
  const { bau, css } = context;

  const className = css`
    color: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: none;
    border-radius: var(--global-radius);
    font-weight: var(--font-weight-semibold);
    text-align: center;
    text-decoration: none;
    overflow: hidden;
    box-sizing: border-box;
    user-select: none;
    transition: all var(--transition-slow);
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
      cursor: pointer;
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
      min-width: 2rem;
      min-height: 2rem;
    }
    &.lg {
      padding: 0.4rem 2rem;
      min-width: 2.5rem;
      min-height: 2.5rem;
    }
    & i {
      font-style: normal;
    }
    ${colorsToCss()}
  `;

  return function Button(...args) {
    let [
      {
        size = options.size ?? "md",
        variant = options.variant ?? "none",
        color = options.color ?? "none",
        href,
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);

    const tagButton = href ? bau.tags.a : bau.tags.button;

    return tagButton(
      {
        ...(!href && { type: "button" }),
        ...props,
        class: [
          "button",
          options.class,
          variant,
          size,
          color,
          className,
          props.class,
        ],
        href,
      },
      children
    );
  };
}
