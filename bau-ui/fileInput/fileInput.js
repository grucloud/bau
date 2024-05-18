export default function (context, options = {}) {
  const { bau, css } = context;
  const { div, label, input } = bau.tags;

  const style = {
    base: css`
      display: inline-flex;
      & input {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
      }
      & label {
        padding: 1rem;
        border-radius: var(--global-radius);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all var(--transition-slow) ease-out;
        &:hover.solid {
          filter: brightness(var(--brightness-hover-always)) !important;
        }
        &:hover {
          filter: brightness(var(--brightness-hover));
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
      size = options.size ?? "md",
      variant = options.variant ?? "outline",
      color = options.color ?? "neutral",
      Component,
      disabled,
      ...otherProps
    } = props;

    return div(
      {
        class: [
          style.base,
          disabled && style.disabled,
          options?.class,
          props.class,
        ],
      },
      label(
        {
          class: [variant, color, size],
        },
        Component({ disabled }),
        input({ type: "file", disabled, ...otherProps })
      )
    );
  };
}
