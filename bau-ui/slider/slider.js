import classNames from "@grucloud/bau-css/classNames";

export default function (context, options = {}) {
  const { bau, css } = context;
  const { input } = bau.tags;

  const className = css``;

  return function Slider(props, ...children) {
    return input(
      {
        ...props,
        type: "range",
        class: classNames("slider", className, options.class, props.class),
      },
      ...children
    );
  };
}
