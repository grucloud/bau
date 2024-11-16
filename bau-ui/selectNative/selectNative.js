import { toPropsAndChildren } from "@grucloud/bau/bau.js";

export default function (context, componentOptions = {}) {
  const { bau, css } = context;
  const { select } = bau.tags;

  const className = css`
    border-radius: var(--global-radius);
    &.sm {
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.7rem;
    }
  `;

  return function SelectNative(...args) {
    let [
      {
        size = componentOptions.size ?? "md",
        variant = componentOptions.variant ?? "outline",
        color = componentOptions.color ?? "neutral",
        ...props
      },
      children,
    ] = toPropsAndChildren(args);

    return select(
      {
        ...props,
        class: [
          "select-native",
          color,
          size,
          variant,
          className,
          componentOptions?.class,
          props?.class,
        ],
      },
      children
    );
  };
}
