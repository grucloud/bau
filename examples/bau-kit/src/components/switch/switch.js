import { css } from "goober";
import { classNames } from "../../utils/classNames";

export default function (context, options = {}) {
  const { theme, bau, tr } = context;
  const { palette, shape, shadows } = theme;
  const { div, input, label } = bau.tags;

  const style = css`
    position: relative;
    width: 2rem;
    height: 1rem;
    background-color: ${palette.grey["400"]};
    border-radius: 5px;
    appearance: none;
    outline: none;
    transition: all 0.5s;
    box-shadow: 0 0 5px rgba(255, 0, 0, 0.2);
    &::after {
      content: "";
      background: #ffffff;
      transform: translateX(0%) scale(1.3);
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      position: absolute;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      background-color: ${palette.grey["700"]};
      transition: all 0.5s;
    }
    &:checked {
      background-color: ${palette.primary.light};
    }
    &:checked::after {
      content: "";
      transform: translateX(100%) scale(1.3);
      background-color: ${palette.primary.main};
    }
  `;

  return function Switch({ id, ...otherProps }, ...children) {
    return input({
      class: style,
      type: "checkbox",
      required: "required",
      id,
      ...otherProps,
    });
  };
}
