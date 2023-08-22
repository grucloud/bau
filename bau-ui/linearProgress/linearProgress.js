import classNames from "@grucloud/bau-css/classNames.js";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";

export default function (context, options) {
  const { bau, css } = context;
  const { div } = bau.tags;
  const className = css`
    border: 1px solid red;
  `;

  return function LinearProgress(...args) {
    let [{ color, variant = "plain", size = "md", ...props }, ...children] =
      toPropsAndChildren(args);
    return div(
      {
        ...props,
        class: classNames(
          "linearProgress",
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
