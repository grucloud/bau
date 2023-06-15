import button from "../button";

const severityMap = {
  error: { icon: "\u26A0" },
  warning: { icon: "\u26A0" },
  success: { icon: "\u2714" },
  info: { icon: "\u2139" },
};

const severityToStyle = ({ severity, message }) => {
  const style = severityMap[severity];
  if (!style) {
    throw Error(`invalid severity: '${severity}', message: ${message}`);
  }
  return style;
};

export default function (context, options = {}) {
  const { theme, bau, css, tr } = context;
  const { palette, shape, shadows } = theme;
  const { div, span, pre, h3, h4 } = bau.tags;

  const toCss = (type) =>
    css`
      border-left: 8px solid ${type.dark};
      color: ${type.main};
      background-color: ${type.light};
    `;

  const Button = button(context);

  const CloseIcon = ({ onclick, severity }) =>
    Button(
      {
        onclick,
      },
      span(
        {
          class: css`
            color: ${palette[severity].dark};
          `,
        },
        "\u2716"
      )
    );

  const style = {
    base: css`
      display: flex;
      max-width: 600px;
      justify-content: flex-start;
      align-items: stretch;
      margin: 0.5rem;
      font-weight: 500;
      box-shadow: ${shadows[3]};
      border-radius: ${shape.borderRadius}px;
    `,
  };

  return function Alert(props, ...children) {
    const {
      name,
      severity = "info",
      message,
      details,
      onRemove,
      ...other
    } = props;

    const alertStyle = severityToStyle({ severity, message });

    return div(
      {
        class: `${style.base} ${toCss(palette[severity])}`,
        role: "alert",
      },
      div(
        {
          class: css`
            padding: 0 1.5rem;
            font-size: 3rem;
            background-color: ${palette[severity].light};
            min-height: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
          `,
        },
        div(alertStyle.icon)
      ),
      div(
        {
          class: css`
            padding: 0 1rem;
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-around;
          `,
        },
        name && h3(tr(name)),
        message && h4(message),
        details && pre(details)
      ),
      div(
        {
          class: css`
            padding: 0 1.5rem;
            font-size: 3rem;
            min-height: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
          `,
        },
        onRemove && CloseIcon({ severity, onclick: onRemove })
      )
    );
  };
}
