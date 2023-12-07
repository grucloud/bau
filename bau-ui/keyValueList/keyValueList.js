import classNames from "@grucloud/bau-css/classNames.js";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";

export default function (context, options = {}) {
  const { bau, css } = context;
  const { ul } = bau.tags;

  const className = css`
    list-style: none;
    & li {
      display: flex;
      flex-direction: column;
      font-size: smaller;
      line-height: 1.6rem;
      & label {
        color: var(--font-color-secondary);
      }
    }
  `;

  return function KeyValueList(...args) {
    let [
      {
        size = options.size ?? "md",
        variant = options.variant ?? "plain",
        color = options.color ?? "neutral",
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);
    return ul(
      {
        ...props,
        class: classNames(
          "keyValueList",
          className,
          options?.class,
          props?.class
        ),
      },
      ...children
    );
  };
}
