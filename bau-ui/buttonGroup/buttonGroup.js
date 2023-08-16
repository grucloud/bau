import classNames from "@grucloud/bau-css/classNames.js";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import { Colors } from "../constants";

const colorsToCss = () =>
  Colors.map(
    (color) =>
      `
&.button-group.${color} {
  & button:not(:last-child) { 
    border-right: 2px solid var(--color-${color}) !important;
  }
  & button:not(:first-child) { 
    border-left: none !important;
  }
}

&.button-group.outline.${color} {
  border: none;
}

&.button-group.solid.${color} {
  & button:not(:last-child) { 
    border-right: 2px solid var(--color-${color}-lightest) !important;
  }
}
`
  ).join("\n");

export default function (context, options) {
  const { bau, css } = context;
  const { div } = bau.tags;

  const className = css`
    display: inline-flex;
    border-radius: var(--global-radius);
    & button:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    & button:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    ${colorsToCss()}
  `;

  return function ButtonGroup(...args) {
    let [{ variant = "outline", size = "md", color, ...props }, ...children] =
      toPropsAndChildren(args);

    return div(
      {
        ...props,
        class: classNames(
          "button-group",
          variant,
          color,
          size,
          className,
          options?.class,
          props?.class
        ),
      },
      ...children
    );
  };
}
