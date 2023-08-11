import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames";

export default function (context, options = {}) {
  const { bau, css } = context;
  const { div, span, pre, h3, h4 } = bau.tags;

  return function MyComponent(...args) {
    let [{ color, variant = "outline", size, ...props }, ...children] =
      toPropsAndChildren(args);
    return div(
      {
        ...props,
        class: classNames(
          "my-component",
          className,
          options?.class,
          props.class
        ),
      },
      "TODO",
      children
    );
  };
}
