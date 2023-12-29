import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames.js";

export default function (context, options = {}) {
  const { bau, css, createGlobalStyles } = context;
  const { button } = bau.tags;

  createGlobalStyles`
    :root {
      --toggle-background-color: rgba(0, 0, 0, 0.3);
    }
    html[data-theme="dark"] {
      --toggle-background-color: rgba(255, 255, 255, 0.4)
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
    &[aria-pressed="true"] {
      background-color: var(--toggle-background-color);
      box-shadow: var(--shadow-lg);
    }
    &[aria-pressed="true"].solid {
      filter: brightness(80%) !important;
    }
    &.outline,
    &.solid {
      box-shadow: var(--shadow-sm);
    }
    &.outline:hover,
    &.solid:hover {
      box-shadow: var(--shadow-lg);
    }
    &:hover:not([aria-pressed="true"]) {
      filter: brightness(var(--brightness-hover)) !important;
    }
    &:hover.solid:not([aria-pressed="true"]) {
      filter: brightness(var(--brightness-hover-always)) !important;
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
        onclick,
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);

    return button(
      {
        type: "button",
        ...props,
        onclick: (event) => {
          const { target } = event;
          const pressed = target.getAttribute("aria-pressed");
          target.setAttribute(
            "aria-pressed",
            pressed == "true" ? "false" : "true"
          );
          onclick && onclick(event);
        },

        class: classNames(
          "toggle",
          size,
          color,
          variant,
          className,
          options?.class,
          props?.class
        ),
      },
      children
    );
  };
}
