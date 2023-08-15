import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames.js";

export default function (context, options) {
  const { bau, css } = context;

  const styles = {
    root: css`
      color: inherit;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0 0.5rem;
      min-width: 2rem;
      min-height: 2rem;
      border: none;
      border-radius: var(--global-radius);
      font-size: 1rem;
      font-weight: var(--font-weight-semibold);
      text-align: center;
      text-decoration: none;
      overflow: hidden;
      box-sizing: border-box;
      user-select: none;
      transition: all var(--transition-slow);
      &:hover {
        filter: brightness(var(--brightness-hover));
      }
      &:hover.solid {
        filter: brightness(var(--brightness));
      }
    `,
    button: css`
      cursor: pointer;
    `,
    a: css``,
    disabled: css`
      color: rgba(0, 0, 0, 0.26);
      cursor: not-allowed;
      pointer-events: none;
      box-shadow: none;
    `,
  };

  return function Button(...args) {
    let [{ color, variant, size, disabled, href, ...props }, ...children] =
      toPropsAndChildren(args);
    const tagButton = href ? bau.tags.a : bau.tags.button;
    return tagButton(
      {
        ...props,
        class: classNames(
          styles.root,
          variant,
          size,
          color,
          href ? styles.a : styles.button,
          disabled && styles.disabled,
          options?.class,
          props.class
        ),
        disabled,
        href,
        ...(!href && { type: "button" }),
      },
      children
    );
  };
}
