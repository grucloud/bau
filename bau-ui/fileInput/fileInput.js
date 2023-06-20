import { classNames } from "../utils/classNames";

export default function (context, options = {}) {
  const { bau, css } = context;
  const { div, span, label, input } = bau.tags;

  const style = {
    base: css`
      display: inline-block;
      width: 25rem;
      > * {
        margin: 1rem 0;
      }
      & input {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
      }
      & .filename-display {
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      & label {
        border-radius: var(--global-radius);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: var(--global-border-width) dotted;
        box-shadow: var(--global-shadow-lw);
        &:hover {
          box-shadow: var(--global-shadow-md);
        }
      }
    `,
    disabled: css`
      color: var(--color-gray-500);
      & label {
        background-color: var(--color-gray-100);
        border: var(--global-border-width) var(--color-gray-500) dotted;
        &:hover {
          box-shadow: var(--global-shadow-lw);
        }
        cursor: not-allowed;
      }
    `,
  };

  return function FileInput(props, ...children) {
    const { Component, disabled, ...otherProps } = props;

    return div(
      { class: classNames(style.base, disabled && style.disabled) },
      label(
        Component({ disabled }),
        input({ type: "file", disabled, ...otherProps })
      ),
      span({ class: "filename-display" })
    );
  };
}
