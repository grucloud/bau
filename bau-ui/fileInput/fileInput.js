import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames";

export default function (context, options) {
  const { bau, css } = context;
  const { div, span, label, input } = bau.tags;

  const style = {
    base: css`
      display: inline-block;
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
        &:hover {
          box-shadow: var(--shadow-m);
        }
      }
    `,
    disabled: css`
      & label {
        &:hover {
          box-shadow: var(--shadow-s);
        }
        cursor: not-allowed;
      }
    `,
  };

  return function FileInput(props, ...children) {
    const {
      variant = "outline",
      color = "neutral",
      size,
      Component,
      disabled,
      ...otherProps
    } = props;

    return div(
      {
        class: classNames(
          style.base,
          disabled && style.disabled,
          options?.class,
          props.class
        ),
      },
      label(
        {
          class: classNames(variant, color, size),
        },
        Component({ disabled }),
        input({ type: "file", disabled, ...otherProps })
      ),
      span({ class: "filename-display" })
    );
  };
}
