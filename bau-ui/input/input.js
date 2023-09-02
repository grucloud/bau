import classNames from "@grucloud/bau-css/classNames.js";
import { Colors } from "../constants.js";

const colorsToCss = () =>
  Colors.map(
    (color) =>
      `
&.input.${color} {
  border: 2px solid transparent;
}
&.input.plain.${color} {
  &:focus {
    border-color: var(--color-${color});
  };
}
&.input.outline.${color} {
  border: 1px solid var(--color-${color});
  &:focus {
    outline: 4px auto var(--color-${color});
  };
}
&.input.solid.${color} {
  &:focus {
    border-color: var(--color-${color});
  };
  &::placeholder {
    color: var(--font-color-inverse);
    filter: brightness(var(--brightness-hover));
  }
  &:hover {
    background-color: var(--color-${color}-light);
  }
}
`
  ).join("\n");

export default function (context, options = {}) {
  const { bau, css } = context;
  const { input } = bau.tags;

  const className = css`
    display: inline-block;
    box-shadow: var(--shadow-s);
    border-radius: var(--global-radius);
    box-sizing: border-box;
    outline: none;
    color: inherit;
    transition: background-color var(--transition-fast) ease-in-out;
    &.input:hover {
      background-color: var(--color-emphasis-100);
    }
    &.input:disabled {
      filter: grayscale(100%);
      background-color: var(--color-emphasis-100);
    }
    &.sm {
      padding: 0.4rem;
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.8rem;
    }
    ${colorsToCss()}
  `;

  return function Input(props) {
    const {
      size = options.size ?? "md",
      variant = options.variant ?? "outline",
      color = options.color ?? "neutral",
      disabled,
      ...otherProps
    } = props;

    return input({
      type: "text",
      ...otherProps,
      disabled,
      class: classNames(
        "input",
        options.class,
        size,
        color,
        variant,
        className,
        disabled && "disabled",
        otherProps.class
      ),
    });
  };
}
