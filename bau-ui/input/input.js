import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames";
import { Colors } from "../constants";

const createStyles = ({ css, createGlobalStyles }) => {
  createGlobalStyles`
:root {
  --input-border-bottom-size: 2px;
}
`;
};

const colorsToCss = () =>
  Colors.map(
    (color) =>
      `
&.input.plain.${color} {
  border: 2px solid transparent;
  &:focus {
    border: 2px solid var(--color-${color});
  };
}
&.input.outline.${color} {
  border: 1px solid var(--color-${color});
  &:focus {
    border: 2px solid var(--color-${color});
  };
}
&.input.soft.${color} {
  border: 2px solid transparent;
  &:focus {
    border: 2px solid var(--color-${color});
  };
}
&.input.solid.${color} {
  border: 2px solid transparent;
  &:focus {
    border: 2px solid var(--color-${color});
  };
  &::placeholder {
    color: var(--color-emphasis-200);
  }
}
`
  ).join("\n");

export default function (context, options) {
  const { bau, css, createGlobalStyles } = context;
  const { input } = bau.tags;

  createStyles({ css, createGlobalStyles });

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
    &:hover {
      background: var(--color-emphasis-200);
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
