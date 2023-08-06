import classNames from "@grucloud/bau-css/classNames";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";

export default function (context, options) {
  const { bau, css } = context;
  const { span } = bau.tags;

  const className = css`
    border-radius: var(--global-radius);
    padding: 0.2rem 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: smaller;
    background-color: var(--color-emphasis-200);
    &.outline {
      background-color: transparent;
      border: 1px solid var(--color-emphasis-200);
    }
    &.primary {
      background-color: var(--color-primary);
      color: var(--color-content-inverse);
    }
    &.secondary {
      background-color: var(--color-secondary);
      color: var(--color-content-inverse);
    }
    &.success {
      background-color: var(--color-success);
      color: var(--color-content-inverse);
    }
    &.danger {
      background-color: var(--color-danger);
      color: var(--color-content-inverse);
    }
    &.clickable {
      cursor: pointer;
    }
  `;

  return function Chip(...args) {
    let [
      { danger, primary, outline, secondary, success, onclick, ...props },
      ...children
    ] = toPropsAndChildren(args);

    return span(
      {
        ...props,
        onclick,
        class: classNames(
          "chip",
          className,
          outline && "outline",
          primary && "primary",
          secondary && "secondary",
          success && "success",
          danger && "danger",
          onclick && "clickable",
          options?.class,
          props?.class
        ),
      },
      ...children
    );
  };
}
