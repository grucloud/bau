import classNames from "@grucloud/bau-css/classNames.js";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import button from "../button";
import spinner from "../spinner";

export default function (context, options = {}) {
  const { bau, css, keyframes } = context;
  const { span } = bau.tags;

  const fadeOut = keyframes`
0% {
      opacity: 1;
}
100% {
      opacity: 0;
}
`;

  const className = css`
    position: relative;
    &:hover.loading {
      cursor: default;
    }
    & .spinner {
      position: absolute;
    }
    & span {
      &.loading {
        animation: ${fadeOut} 0.5s;
        opacity: 0;
      }
    }
    &.md {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  `;

  return function LoadingButton(...args) {
    let [
      {
        size = options.size ?? "md",
        variant = options.variant ?? "plain",
        color = options.color ?? "neutral",
        loading,
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);

    const Button = button(context);
    const Spinner = spinner(context);

    return bau.bind({
      deps: [loading],
      render: () => (loading) =>
        Button(
          {
            ...props,
            class: classNames(
              "loadingButton",
              size,
              variant,
              color,
              className,
              loading && "loading",
              options?.class,
              props?.class
            ),
          },
          Spinner({ size, variant, color, visibility: loading }),
          span({ class: loading && "loading" }, children)
        ),
    });
  };
}
