import classNames from "@grucloud/bau-css/classNames";

import button from "../button";

const severityMap = {
  danger: "\u26A0",
  warning: "\u26A0",
  success: "\u2714",
  info: "\u2139",
};

const darkVar = (severity) => `var(--color-${severity}-darkest)`;

const severitiesToCss = () =>
  Object.keys(severityMap)
    .map(
      (severity) =>
        `.alert-${severity} {
    border-left: var(--alert-border-left-width) solid ${darkVar(severity)};
    color: ${darkVar(severity)};
    background-color: var(--background-color);
    & .button-close {
      color: ${darkVar(severity)};
    }
  }`
    )
    .join("\n");

const createStyles = ({ css, createGlobalStyles }) => {
  createGlobalStyles`
:root {
  --alert-border-left-width: 8px;
}
${severitiesToCss()}
`;

  return {
    base: css`
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
    `,
  };
};

export default function (context) {
  const { bau, css, createGlobalStyles, tr } = context;
  const { div } = bau.tags;

  const styles = createStyles({ css, createGlobalStyles });

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
    const { severity = "info", onRemove, ...otherProps } = props;
    return div(
      {
        ...otherProps,
        class: classNames(styles.base, `alert-${severity}`, props.class),
        role: "alert",
      },
      div({ class: "icon" }, severityMap[severity]),
      div({ class: "content" }, ...children),
      onRemove && CloseIcon({ onclick: onRemove })
    );
  };
}
