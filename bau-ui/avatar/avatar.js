import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames.js";
import skeleton from "../skeleton";

export default function (context, options = {}) {
  const { bau, css } = context;
  const { div, img } = bau.tags;

  const loadingState = bau.state(true);
  const errorState = bau.state(false);

  const onload = () => (loadingState.val = false);

  const onerror = (event) => {
    loadingState.val = false;
    errorState.val = true;
  };

  const className = css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
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
    & img {
      visibility: hidden;
      opacity: 0;
      transition: opacity var(--transition-slow) ease-in;
    }
    & .visible {
      visibility: visible;
      opacity: 1;
    }
    & .hide {
      display: none;
    }
  `;
  return function Avatar(...args) {
    let [
      {
        size = options.size ?? "md",
        variant = options.variant ?? "plain",
        color = options.color ?? "neutral",
        width = 40,
        height = 40,
        alt,
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);
    const Skeleton = skeleton(context, {
      class: classNames(
        css`
          position: absolute;
          top: 0;
          left: 0;
          height: ${height}px;
          width: ${width}px;
        `,
        options?.class,
        props.class
      ),
    });

    return div(
      { class: classNames(className, options?.class, props.class) },
      () => loadingState.val && Skeleton(),
      () => errorState.val && alt,
      img({
        alt,
        width,
        height,
        onload,
        onerror,
        class: () =>
          classNames(
            !loadingState.val && "visible",
            errorState.val && "hide",
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
