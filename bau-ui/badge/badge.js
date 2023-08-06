import classNames from "@grucloud/bau-css/classNames";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";

export default function (context, options) {
  const { bau, css } = context;
  const { span } = bau.tags;

  const className = css`
    position: relative;
    & span {
      display: block;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0;
      right: 0;
      font-size: 0.75rem;
      font-weight: 600;
      transform: scale(1) translate(100%, -50%);
      transform-origin: 100% 0%;
      padding: 0.2rem;
      border-radius: 1rem;
      min-width: 1rem;
      height: 1rem;
    }
    &.primary span {
      background-color: var(--color-primary);
      color: var(--color-content-inverse);
    }
    &.secondary span {
      background-color: var(--color-secondary);
      color: var(--color-content-inverse);
    }
    &.success span {
      background-color: var(--color-success);
      color: var(--color-content-inverse);
    }
    &.danger span {
      background-color: var(--color-danger);
      color: var(--color-content-inverse);
    }
  `;

  return function Badge(...args) {
    let [
      { content, danger, primary, secondary, success, ...props },
      ...children
    ] = toPropsAndChildren(args);
    return span(
      {
        ...props,
        class: classNames(
          "badge",
          className,
          primary && "primary",
          secondary && "secondary",
          success && "success",
          danger && "danger",
          options?.class,
          props?.class
        ),
      },
      span(content),
      ...children
    );
  };
}
