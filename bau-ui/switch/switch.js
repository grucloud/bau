import classNames from "@grucloud/bau-css/classNames";

export default function (context) {
  const { bau, css } = context;
  const { input } = bau.tags;

  const style = css`
    position: relative;
    width: 2rem;
    height: 1rem;
    background-color: var(--color-gray-300);
    border-radius: var(--global-radius);
    appearance: none;
    outline: none;
    transition: all var(--transition-fast);
    box-shadow: var(--shadow-m);
    &::after {
      content: "";
      background: var(--background-color);
      transform: translateX(0%) scale(1.3);
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      position: absolute;
      box-shadow: var(--shadow-m);
      background-color: var(--color-gray-700);
      transition: all var(--transition-fast);
    }
    &:checked {
      background-color: var(--color-primary-lighter);
    }
    &:checked::after {
      content: "";
      transform: translateX(100%) scale(1.3);
      background-color: var(--color-primary);
    }
  `;

  return function Switch(props, ...children) {
    return input(
      {
        ...props,
        class: classNames(style, props.class),
        type: "checkbox",
        required: "required",
      },
      ...children
    );
  };
}
