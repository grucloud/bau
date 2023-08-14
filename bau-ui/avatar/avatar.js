import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames.js";

export default function (context, options) {
  const { bau } = context;
  const { span, img } = bau.tags;

  const loadingState = bau.state(true);
  const errorState = bau.state(false);

  const onload = () => (loadingState.val = false);

  const onerror = (event) => {
    loadingState.val = false;
    errorState.val = true;
  };

  return function Avatar(...args) {
    let [
      { color, variant = "outline", size, width = 60, height = 60, ...props },
      ...children
    ] = toPropsAndChildren(args);
    return span(
      { class: classNames(options?.class, props.class) },
      () => (loadingState.val ? "Loading..." : ""),
      () => errorState.val && "Error",
      img({
        width,
        height,
        onload,
        onerror,
        class: classNames(options?.class, color, variant, size, props.class),
        ...props,
      })
    );
  };
}
