import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames.js";

export default function (context, options) {
  const { bau, css } = context;

  const styles = {
    root: css`
      color: var(--font-color-base);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 0 0.5rem;
      min-width: 2rem;
      min-height: 2rem;
      outline: none;
      border: none;
      border-radius: var(--global-radius);
      background: transparent;
      font-size: 1rem;
      font-weight: var(--font-weight-semibold);
      text-align: center;
      text-decoration: none;
      text-transform: uppercase;
      overflow: hidden;
      box-sizing: border-box;
      user-select: none;
      transition: background-color var(--transition-fast);
      &::before {
        background-color: rgba(0, 0, 0, 0.2);
        position: absolute;
        top: calc(50% - 100%);
        left: calc(50% - 100%);
        width: 200%;
        height: 200%;
        transition: opacity var(--transition-fast) linear;
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        content: "";
      }
      &:active {
        &::before {
          opacity: 1;
        }
      }
      &:hover {
        &::before {
          opacity: 0.5;
        }
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
    let [
      { color, variant = "outline", size, disabled, href, ...props },
      ...children
    ] = toPropsAndChildren(args);
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
