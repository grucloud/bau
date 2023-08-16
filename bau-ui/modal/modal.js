import classNames from "@grucloud/bau-css/classNames.js";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import { Colors } from "../constants";

export default function (context, options) {
  const { bau, css } = context;
  const { dialog } = bau.tags;

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
    top: 0;
    left: 0;
    max-height: 90vh;
    max-width: 95vw;
    transition: transform 0.3s ease-out;
    border-radius: 10px;
    min-width: 400px;
    padding: 0px;
    border: 0px;
    & header {
      padding: 1rem;
      font-size: 1.8rem;
      font-weight: 800;
      text-align: center;
    }
    & footer {
      display: flex;
      justify-content: flex-end;
      margin: 0px;
      box-shadow: var(--shadow-s);
      padding: 1rem;
      gap: 1rem;
    }
    & > main {
      margin: 12px;
      flex-grow: 1;
      overflow: scroll;
    }
    ${colorsToCss()}
  `;

  return function Modal(...args) {
    let [
      { color = "neutral", variant = "outline", size = "md", ...props },
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
      ...children
    );
  };
}
