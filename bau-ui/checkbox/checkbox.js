import classNames from "@grucloud/bau-css/classNames";

export default function (context, options = {}) {
  const { bau, css } = context;
  const { input } = bau.tags;
  const style = {
    base: css`
      width: 1.5rem;
      height: 1.5rem;
      border-radius: var(--global-radius);
      appearance: none;
      outline: none;
      box-sizing: border-box;
      transition: all var(--transition-fast) ease-in-out;
      box-shadow: var(--shadow-s);
      border: 2px solid var(--color-gray-600);
      position: relative;
      &:hover {
        transform: scale(1.05);
      }
      &:disabled {
        border: 2px dashed var(--color-gray-500);
      }
      &:checked {
        border: 2px solid var(--color-primary);
        background-color: var(--color-primary);
      }
      &::after {
        content: "\u2716";
        position: absolute;
        font-size: 1.2rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: var(--color-primary);
        opacity: 0;
      }
      &:checked::after {
        color: var(--color-gray-100);
        opacity: 1;
      }
    `,
  };

  return function Checkbox(props, ...children) {
    return input({
      class: classNames(style.base, props.class),
      type: "checkbox",
      required: "required",
      ...props,
    });
  };
}
