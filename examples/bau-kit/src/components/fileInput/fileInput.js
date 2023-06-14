import { classNames } from "../../utils/classNames";

export default function (context, options = {}) {
  const { theme, bau, css } = context;
  const { palette, shape, shadows } = theme;
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
      .filename-display {
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      & label {
        border-radius: ${shape.borderRadius}px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: 2px dotted;
        box-shadow: ${shadows[2]};
        &:hover {
          box-shadow: ${shadows[5]};
        }
      }
    `,
    disabled: css`
      color: ${palette.grey[500]};
      & label {
        background-color: ${palette.grey[100]};
        border: 2px ${palette.grey[500]} dotted;
        &:hover {
          box-shadow: ${shadows[2]};
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
