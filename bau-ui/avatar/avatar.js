import classNames from "@grucloud/bau-css/classNames";

export default function (context, options = {}) {
  const { bau } = context;
  const { span, img } = bau.tags;

  const loadingState = bau.state(true);
  const errorState = bau.state(false);

  const onload = () => (loadingState.val = false);

  const onerror = (event) => {
    loadingState.val = false;
    errorState.val = true;
  };

  return function Avatar({ width = 60, height = 60, ...props }, ...children) {
    return span(
      { class: classNames(options.cssOverride, props.class) },
      () => (loadingState.val ? "Loading..." : ""),
      () => errorState.val && "Error",
      img({ width, height, onload, onerror, ...props })
    );
  };
}
