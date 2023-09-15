import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames.js";

export default function (context, options = {}) {
  const { bau, css, createGlobalStyles } = context;
  const { button } = bau.tags;

  createGlobalStyles`
    :root {
      --toggle-background-color: rgba(0, 0, 0, 0.2);
    }
    html[data-theme="dark"] {
      --toggle-background-color: rgba(255, 255, 255, 0.16)
    }
  `;
  const className = css`
    color: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
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
    box-sizing: border-box;
    cursor: pointer;
    &.selected {
      background-color: var(--toggle-background-color);
    }
    &.selected.solid {
      filter: brightness(80%) !important;
    }
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
    &.sm {
      padding: 0.3rem;
    }
    &.md {
      padding: 0.2rem 0.8rem;
    }
    &.lg {
      padding: 0.2rem 2rem;
    }
  `;

  return function Toggle(...args) {
    let [
      {
        size = options.size ?? "md",
        variant = options.variant ?? "outline",
        color = options.color ?? "neutral",
        selected = false,
        disabled,
        onChange,
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);

    return button(
      {
        type: "button",
        ...props,
        "aria-pressed": {
          deps: [selected],
          renderProp: () => (selected) => selected,
        },
        class: {
          deps: [selected],
          renderProp: () => (selected) =>
            classNames(
              "toggle",
              size,
              color,
              variant,
              className,
              selected && "selected",
              options?.class,
              props?.class
            ),
        },
        disabled,
      },
      children
    );
  };
}
