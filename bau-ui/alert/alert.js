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

const createStyles = ({ css, createGlobalStyles }) => {
  createGlobalStyles`
:root {
  --alert-border-left-width: 8px;
}
`;
};

const colorsToCss = () =>
  Colors.map(
    (color) =>
      `
&.alert.outline.${color} {
  & .icon {
    color: var(--color-${color})
  }
}
`
  ).join("\n");

export default function (context, options) {
  const { bau, css, createGlobalStyles } = context;
  const { div, i } = bau.tags;

  createStyles({ css, createGlobalStyles });

  const className = css`
    display: flex;
    max-width: 600px;
    justify-content: flex-start;
    align-items: center;
    margin: 0.5rem;
    font-weight: var(--font-weight-semibold);
    box-shadow: var(--shadow-m);
    border-radius: var(--global-radius);
    & .icon {
      padding: 0 1rem;
      font-size: 2.5rem;
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

  return function Alert(props, ...children) {
    const {
      variant = "outline",
      color = "neutral",
      size = "md",
      onRemove,
      ...otherProps
    } = props;
    return div(
      {
        ...otherProps,
        class: classNames(
          `alert-${variant}`,
          variant,
          color,
          size,
          className,
          options?.class,
          props.class,
          "alert"
        ),
        role: "alert",
      },
      i({ class: "icon" }, severityMap[color]),
      div({ class: "content" }, ...children),
      onRemove && CloseIcon({ onclick: onRemove })
    );
  };
}
