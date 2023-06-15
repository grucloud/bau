export default function (context, options = {}) {
  const { theme, bau, css } = context;
  const { palette, shape, shadows } = theme;
  const { input } = bau.tags;
  const style = {
    base: css`
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 4px;
      appearance: none;
      outline: none;
      box-sizing: border-box;
      transition: all 0.2s ease-in-out;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
      border: 2px solid ${palette.grey["600"]};
      position: relative;
      &:hover {
        transform: scale(1.1);
      }
      &:disabled {
        border: 2px dashed ${palette.text.disabled};
      }
      &:checked {
        border: 2px solid ${palette.primary.main};
        background-color: ${palette.primary.main};
      }
      &::after {
        content: "\u2716";
        position: absolute;
        font-size: 1.2rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: ${palette.primary.main};
        opacity: 0;
      }
      &:checked::after {
        color: ${palette.grey["200"]};
        opacity: 1;
      }
    `,
  };

  return function Checkbox(props, ...children) {
    return input({
      class: style.base,
      type: "checkbox",
      required: "required",
      ...props,
    });
  };
}
