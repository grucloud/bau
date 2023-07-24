import classNames from "@grucloud/bau-css/classNames";

const createStyles = ({ css, createGlobalStyles }) => {
  createGlobalStyles`
:root {
  --input-border-bottom-size: 2px;
}
`;

  return {
    base: css`
      position: relative;
      display: inline-block;
      min-height: 3rem;

      & input {
        font-size: 1.2rem;
        background: var(--color-emphasis-100);
        box-shadow: var(--shadow-s);
        border-radius: var(--global-radius);
        border: var(--input-border-bottom-size) solid transparent;
        border-bottom: var(--input-border-bottom-size) solid
          var(--color-emphasis-900);
        box-sizing: border-box;
        padding: 26px 10px 4px 10px;
        outline: none;
        transition: background-color var(--transition-fast) ease-in-out;
        &:hover {
          background: var(--color-emphasis-200);
        }
        &:focus,
        &:valid {
          border-bottom: var(--input-border-bottom-size) solid
            var(--color-primary);
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
        border-bottom: var(--input-border-bottom-size) dashed
          var(--font-color-disabled);
      }
    `,
    error: css`
      color: var(--color-danger-darkest) !important;
      & * {
        color: var(--color-danger-darkest) !important;
      }
      & input {
        border-bottom: var(--input-border-bottom-size) dashed
          var(--color-danger-darkest) !important;
      }
    `,
  };
};

export default function (context, options = {}) {
  const { bau, css, createGlobalStyles } = context;
  const { div, input, label } = bau.tags;

  const styles = createStyles({ css, createGlobalStyles });

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
          styles.base,
          disabled && styles.disabled,
          error && styles.error,
          props.class
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
