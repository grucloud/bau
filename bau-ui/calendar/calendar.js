import classNames from "@grucloud/bau-css/classNames";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";

export default function (context, options) {
  const { bau, css } = context;
  const { input } = bau.tags;

  const className = css``;

  return function Calendar(...args) {
    let [props, ...children] = toPropsAndChildren(args);
    return input(
      {
        ...props,
        type: "date",
        class: classNames("calendar", className, options?.class, props?.class),
      },
      ...children
    );
  };
}
