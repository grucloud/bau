import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import { Colors } from "../constants.js";

const colorsToCss = () =>
  Colors.map(
    (color) =>
      `
&.toggle-group.${color} {
  & button:not(:last-child) { 
    border-right: 1px solid var(--color-${color}) !important;
  }
  & button:not(:first-child) { 
    border-left: 1px solid var(--color-${color}) !important;
  }
}

&.toggle-group.outline.${color} {
  border: none;
}

&.toggle-group.solid.${color} {
  & button:not(:last-child) { 
    border-right: 1px solid var(--color-${color}-lightest) !important;
  }
}
`
  ).join("\n");

export default function (context, options = {}) {
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

  return function ToggleGroup(...args) {
    let [
      {
        size = options.size ?? "md",
        variant = options.variant ?? "outline",
        color = options.color ?? "neutral",
        exclusive = false,
        onChange = () => {},
        ...props
      },
      children,
    ] = toPropsAndChildren(args);

    const selectedSet = new Set();

    const onclick = (event) => {
      const { value } = event.target;
      if (exclusive) {
        selectedSet.clear();
        selectedSet.add(value);
      } else {
        if (selectedSet.has(value)) {
          selectedSet.delete(value);
        } else {
          selectedSet.add(value);
        }
      }
      onChange({ event, values: [...selectedSet] });
    };

    return div(
      {
        ...props,
        class: [
          "toggle-group",
          size,
          color,
          variant,
          className,
          options?.class,
          props?.class,
        ],
        onclick,
      },
      children
    );
  };
}
