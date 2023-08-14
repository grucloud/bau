import classNames from "@grucloud/bau-css/classNames.js";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";

export default function (context, options) {
  const { bau, css } = context;
  const { span } = bau.tags;

  const className = css`
    border-radius: var(--global-radius);
    padding: 0.2rem 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: smaller;
    &.clickable {
      cursor: pointer;
    }
  `;

  return function Chip(...args) {
    let [
      { size, variant = "outline", color = "neutral", onclick, ...props },
      ...children
    ] = toPropsAndChildren(args);

    return span(
      {
        ...props,
        onclick,
        class: classNames(
          "chip",
          className,
          size,
          variant,
          color,
          onclick && "clickable",
          options?.class,
          props?.class
        ),
      },
      ...children
    );
  };
}
