import { css } from "goober";
import { classNames } from "../../utils/classNames";

export default function (context, options = {}) {
  const { theme, bau } = context;
  const { palette, shape, shadows } = theme;
  const { div, input, label } = bau.tags;
  const style = {
    base: css`
      position: relative;
      display: inline-block;
      font-size: 1rem;
      min-height: 3rem;
      input {
        box-shadow: ${shadows[2]};
        border-radius: ${shape.borderRadius}px;
        border: 2px solid transparent;
        font-size: 16px;
        box-sizing: border-box;
        padding: 26px 10px 4px 10px;
        outline: none;
        &:hover {
          box-shadow: ${shadows[4]};
        }
        &:focus,
        &:valid {
          border: 2px solid ${palette.primary.main};
        }
        &:focus + label,
        &:valid + label,
        &:disabled + label {
          top: 1rem;
          font-size: 0.8rem;
          font-weight: bold;
          color: ${palette.primary.main};
        }
      }
      label {
        display: block;
        top: 1.5rem;
        line-height: 0;
        position: absolute;
        pointer-events: none;
        padding: 0px 10px;
        transition: 0.2s ease-in-out;
        color: ${palette.text.secondary};
        &:focus {
          font-style: normal;
        }
      }
      > div {
        margin: 0.2rem 0;
        position: absolute;
      }
    `,
    disabled: css`
      * {
        color: ${palette.text.disabled} !important;
      }
      input {
        border: 1px dashed ${palette.text.disabled};
      }
    `,
    error: css`
      * {
        color: ${palette.error.main} !important;
      }
      input {
        border: 1px dashed ${palette.error.main} !important;
      }
    `,
  };

  return function Input(props) {
    const {
      name,
      id,
      disabled,
      label: labelValue = "",
      error = "",
      ...otherProps
    } = props;
    return div(
      {
        class: classNames(
          style.base,
          disabled ? style.disabled : "",
          error ? style.error : ""
        ),
      },
      input({
        id,
        name,
        type: "text",
        required: true,
        disabled,
        ...otherProps,
      }),
      label({ htmlFor: id }, labelValue)
    );
  };
}
