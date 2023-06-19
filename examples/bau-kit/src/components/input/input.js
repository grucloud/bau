import { classNames } from "../../utils/classNames";

export default function (context, options = {}) {
  const { bau, css } = context;
  const { div, input, label } = bau.tags;
  const style = {
    base: css`
      position: relative;
      display: inline-block;
      font-size: 1rem;
      min-height: 3rem;
      & input {
        box-shadow: var(--global-shadow-lw);
        border-radius: var(--global-radius);
        border: 2px solid transparent;
        box-sizing: border-box;
        padding: 26px 10px 4px 10px;
        outline: none;
        &:hover {
          box-shadow: var(--global-shadow-md);
        }
        &:focus,
        &:valid {
          border: 2px solid var(--color-primary);
        }
        &:focus + label,
        &:valid + label,
        &:disabled + label {
          top: 1rem;
          font-size: 0.8rem;
          font-weight: bold;
          color: var(--color-primary);
        }
      }
      & label {
        display: block;
        top: 1.5rem;
        line-height: 0;
        position: absolute;
        pointer-events: none;
        padding: 0px 10px;
        transition: var(--transition-fast) ease-in-out;
        color: var(--font-color-secondary);
        &:focus {
          font-style: normal;
        }
      }
      & div[data-input-error] {
        margin: 0.2rem 0;
        position: absolute;
        background: var(--background-color);
      }
    `,
    disabled: css`
      & * {
        color: var(--font-color-disabled) !important;
      }
      & input {
        border: 1px dashed var(--font-color-disabled);
      }
    `,
    error: css`
      color: var(--color-danger) !important;
      & * {
        color: var(--color-danger) !important;
      }
      & input {
        border: 1px dashed var(--color-danger) !important;
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
          disabled && style.disabled,
          error && style.error
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
      label({ htmlFor: id }, labelValue),
      div({ "data-input-error": name }, error)
    );
  };
}
