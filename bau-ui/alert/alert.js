import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames.js";
import { Colors } from "../constants.js";

import button from "../button";

const severityMap = {
  danger: "\u26A0",
  warning: "\u26A0",
  success: "\u2714",
  primary: "\u2139",
  neutral: "\u2139",
};

const colorsToCss = () =>
  Colors.map(
    (color) =>
      `
&.alert {
  &.sm {
    & .icon {
      font-size: 1.3rem;
    }
  }
  &.lg {
    & .icon {
      font-size: 2.5rem;
    }
  }
  &.plain.${color} {
    & .icon {
      color: var(--color-${color})
    }
  }
  &.outline.${color} {
    & .icon {
      color: var(--color-${color})
    }
  }
}
  `
  ).join("\n");

export default function (context, options = {}) {
  const { bau, css } = context;
  const { div, i } = bau.tags;

  const className = css`
    display: flex;
    max-width: 600px;
    justify-content: flex-start;
    align-items: center;
    font-weight: var(--font-weight-semibold);
    box-shadow: var(--shadow-m);
    border-radius: var(--global-radius);
    & .icon {
      padding: 0 0.5rem;
      font-size: 2rem;
    }
    & .content {
      padding: 0 0.5rem;
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;
    }
    & .button-close {
      margin: 1rem;
    }
    ${colorsToCss()}
  `;
  const Button = button(context);

  const CloseIcon = ({ onclick }) =>
    Button(
      {
        "aria-label": "Close",
        onclick,
        class: "button-close",
      },
      "\u2716"
    );

  return function Alert(...args) {
    let [
      {
        size = options.size ?? "md",
        variant = options.variant ?? "outline",
        color = options.color ?? "neutral",
        onRemove,
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);

    return div(
      {
        ...props,
        class: classNames(
          "alert",
          `alert-${variant}`,
          options.class,
          variant,
          color,
          size,
          className,
          props.class
        ),
        role: "alert",
      },
      i({ class: "icon" }, severityMap[color]),
      div({ class: "content" }, ...children),
      onRemove && CloseIcon({ onclick: onRemove })
    );
  };
}
