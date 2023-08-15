import classNames from "@grucloud/bau-css/classNames.js";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import { Colors } from "../constants";

export default function (context, options) {
  const { bau, css } = context;
  const { ul } = bau.tags;

  const colorsToCss = () =>
    Colors.map(
      (color) =>
        `
`
    ).join("\n");

  const className = css`
    list-style: none;
    padding: 0;
    margin: 0 0;
    &.solid {
      & li:hover {
        filter: brightness(var(--brightness-hover-always));
      }
      & li.active {
        filter: brightness(var(--brightness-active-always));
      }
    }

    & li {
      padding: 0.5rem;
      cursor: pointer;
      background-color: inherit;
      transition: all var(--transition-slow) ease-out;
      &:hover {
        filter: brightness(var(--brightness-hover));
      }
      &.active {
        filter: brightness(var(--brightness-active));
      }
    }
    ${colorsToCss()}
  `;

  return function List(...args) {
    let [
      { color = "neutral", variant = "plain", size, ...props },
      ...children
    ] = toPropsAndChildren(args);
    return ul(
      {
        ...props,
        class: classNames(
          "list",
          className,
          color,
          variant,
          size,
          options?.class,
          props?.class
        ),
      },
      ...children
    );
  };
}
