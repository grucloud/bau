import classNames from "@grucloud/bau-css/classNames.js";
import { Colors } from "../constants";

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
    border: 2px solid var(--color-${color});
  };
}
&.input.soft.${color} {
  &:focus {
    border-color: var(--color-${color});
  };
} 
&.input.solid.${color} {
  &:focus {
    border-color: var(--color-${color});
  };
  &::placeholder {
    color: var(--color-emphasis-200);
  }
  &:hover {
    background-color: var(--color-${color}-light);
  }
}
`
  ).join("\n");

export default function (context, options) {
  const { bau, css } = context;
  const { input } = bau.tags;

  const className = css`
    display: inline-block;
    font-size: large;
    padding: 1rem;
    height: 2.5rem;
    box-shadow: var(--shadow-s);
    border-radius: var(--global-radius);
    box-sizing: border-box;
    outline: none;
    color: inherit;
    transition: background-color var(--transition-fast) ease-in-out;
    &.input:hover {
      background-color: var(--color-emphasis-100);
    }
    ${colorsToCss()}
  `;

  return function Input(props) {
    const {
      size,
      variant = "outline",
      color = "neutral",
      name,
      id,
      disabled,
      ...otherProps
    } = props;

    return input({
      ...otherProps,
      class: classNames(
        "input",
        size,
        color,
        variant,
        className,
        options?.class,
        otherProps.class
      ),
    });
  };
}
