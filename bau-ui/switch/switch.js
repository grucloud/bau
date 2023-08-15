import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames.js";
import { Colors } from "../constants";

const colorsToCss = () =>
  Colors.map(
    (color) =>
      `
&.switch.plain.${color} {
  &::after {
    background-color: var(--color-emphasis-200);
  }
  &:checked::after {
    background-color: var(--color-${color});
  }
}
&.switch.outline.${color} {
  &::after {
    background-color: var(--color-emphasis-200);
  }
  &:checked::after {
    background-color: var(--color-${color});
  }
}
&.switch.soft.${color} {
  &::after {
    background-color: var(--color-emphasis-200);
  }
  &:checked::after {
    background-color: var(--color-${color});
  }
}
&.switch.solid.${color} {
  background-color: var(--color-emphasis-800);
  &::after {
    background-color: var(--color-emphasis-200);
  } 
  &:checked {
    background-color: var(--color-${color}) ;
  }
  &:checked::after {
    background-color: var(--color-emphasis-200);
  }
  &:hover {
    filter: brightness(var(--brightness-hover-reverse));
  }
}
`
  ).join("\n");

export default function (context, options) {
  const { bau, css } = context;
  const { input } = bau.tags;

  const style = css`
    position: relative;
    width: 2.4rem;
    height: 1.4rem;
    border-radius: 0.7rem;
    appearance: none;
    outline: none;
    transition: all var(--transition-fast);
    box-shadow: var(--shadow-m);
    &::after {
      content: "";
      transform: translate(-100%, -50%);
      left: 50%;
      top: 50%;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      position: absolute;
      box-shadow: var(--shadow-m);
      transition: all var(--transition-fast);
      background-color: var(--color-emphasis-800);
    }
    &:checked::after {
      content: "";
      transform: translate(0%, -50%);
    }
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
    ${colorsToCss()}
  `;

  return function Switch(...args) {
    let [
      { color = "neutral", variant = "plain", size, ...props },
      ...children
    ] = toPropsAndChildren(args);
    return input(
      {
        ...props,
        class: classNames(
          "switch",
          style,
          color,
          variant,
          size,
          options?.class,
          props.class
        ),
        type: "checkbox",
        required: "required",
      },
      ...children
    );
  };
}
