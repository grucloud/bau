import classNames from "@grucloud/bau-css/classNames.js";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import { Colors } from "../constants.js";

export default function (context, options = {}) {
  const { bau, css } = context;
  const { dialog, div } = bau.tags;

  const colorsToCss = () =>
    Colors.map(
      (color) =>
        `
&.modal.plain.${color} {
  color: inherit;
}
&.modal.outline.${color} {
  color: inherit;
}
&.modal.soft.${color} {
  color: inherit;
}
&.modal.solid.${color} {
}
`
    ).join("\n");

  const className = css`
    box-shadow: var(--shadow-s);
    background-color: var(--background-color);
    border-radius: var(--global-radius);
    min-width: 400px;
    padding: 1rem;
    border: 0px;
    > div {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      max-height: 90vh;
      max-width: 95vw;
      & > header {
        font-size: 1.5rem;
        font-weight: 500;
      }
      & > main,
      > section {
        flex-grow: 1;
        overflow-y: auto;
      }
      & > footer {
        display: flex;
        justify-content: flex-end;
        padding: 1rem;
        gap: 1rem;
      }
    }

    ${colorsToCss()}
  `;

  return function Modal(...args) {
    let [
      {
        size = options.size ?? "md",
        variant = options.variant ?? "plain",
        color = options.color ?? "neutral",
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);

    return dialog(
      {
        class: classNames(
          "modal",
          className,
          color,
          variant,
          size,
          options?.class,
          props?.class
        ),
      },
      div(...children)
    );
  };
}
