import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames.js";

export default function (context, options = {}) {
  const { bau, css } = context;
  const { input } = bau.tags;
  const className = css`
    width: 1.5rem;
    height: 1.5rem;
    border-radius: var(--global-radius);
    appearance: none;
    outline: none;
    box-sizing: border-box;
    transition: all var(--transition-fast) ease-in-out;
    box-shadow: var(--shadow-s);
    position: relative;
    &:hover {
      transform: scale(1.05);
    }
    &:disabled {
      border: 2px dashed var(--color-gray-500);
    }
    &:checked::after {
      opacity: 1;
    }
    &::after {
      content: "\u2716";
      position: absolute;
      font-size: 1.2rem;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all var(--transition-fast) ease-in-out;
      opacity: 0;
    }
  `;

  return function Checkbox(...args) {
    let [{ color, variant = "outline", size, ...props }, ...children] =
      toPropsAndChildren(args);

    return input({
      type: "checkbox",
      required: "required",
      ...props,
      class: classNames(
        className,
        color,
        variant,
        size,
        options?.class,
        props?.class
      ),
    });
  };
}
