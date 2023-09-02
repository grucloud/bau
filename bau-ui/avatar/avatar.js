import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames.js";

export default function (context, options) {
  const { bau, css } = context;
  const { span, img } = bau.tags;

  const loadingState = bau.state(true);
  const errorState = bau.state(false);

  const onload = () => (loadingState.val = false);

  const onerror = (event) => {
    loadingState.val = false;
    errorState.val = true;
  };

  const className = css`
    display: flex;
    justify-content: center;
    align-items: center;
    &.sm {
      width: 20px;
      height: 20px;
    }
    &.md {
      width: 40px;
      height: 40px;
    }
    &.lg {
      width: 60px;
      height: 60px;
    }
  `;
  return function Avatar(...args) {
    let [
      {
        color,
        variant = "outline",
        size = "md",
        width = 40,
        height = 40,
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);
    return span(
      { class: classNames(className, options?.class, props.class) },
      () => (loadingState.val ? "Loading..." : ""),
      () => errorState.val && "Error",
      img({
        width,
        height,
        onload,
        onerror,
        class: classNames(
          color,
          variant,
          size,
          className,
          options?.class,
          props.class
        ),
        ...props,
      })
    );
  };
}
