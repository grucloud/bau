import { classNames } from "../utils/classNames";

export default function (context, options = {}) {
  const { bau, css } = context;
  const { span } = bau.tags;

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
    flat: css`
      border-width: 0;
    `,
    flatPrimary: css`
      color: var(--color-primary);
    `,
    flatAccent: css`
      color: var(--color-secondary-darkest);
    `,
    raised: css`
      box-shadow: var(--global-shadow-lw);
      &:active {
        box-shadow: var(--global-shadow-md);
      }
    `,
    raisedPrimary: css`
      background-color: var(--color-primary-darkest);
      color: var(--color-content-inverse);
    `,
    raisedAccent: css`
      background-color: var(--color-secondary-darkest);
      color: var(--color-content-inverse);
    `,
    disabled: css`
      color: rgba(0, 0, 0, 0.26);
      cursor: default;
      pointer-events: none;
      box-shadow: none;
    `,
    raisedDisabled: css`
      background-color: rgba(0, 0, 0, 0.12);
    `,
    fullWidth: css`
      text-align: center;
      width: 100%;
    `,
    ripple: css`
      position: relative;
      overflow: hidden;
      transform: translate3d(0, 0, 0);
      &::after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        background-image: radial-gradient(circle, #000 10%, transparent 10%);
        background-repeat: no-repeat;
        background-position: 50%;
        transform: scale(10, 10);
        opacity: 0;
        transition: transform var(--transition-slow), opacity 1s;
      }
      &:active::after {
        transform: scale(0, 0);
        opacity: 0.2;
        transition: 0s;
      }
    `,
  };

  return function Button(props, ...children) {
    const {
      fullWidth,
      label,
      primary,
      accent,
      raised,
      disabled,
      ripple,
      href,
      icon,
      ...otherProps
    } = props;
    const tagButton = href ? bau.tags.a : bau.tags.button;
    return tagButton(
      {
        ...otherProps,
        class: classNames(
          styles.root,
          href ? styles.a : styles.button,
          raised ? styles.raised : styles.flat,
          !raised && primary && styles.flatPrimary,
          !raised && accent && styles.flatAccent,
          raised && primary && styles.raisedPrimary,
          raised && accent && styles.raisedAccent,
          ripple && styles.rippledisabled && styles.disabled,
          disabled && raised && styles.raisedDisabled,
          fullWidth && styles.fullWidth,
          props.class
        ),
        href,
        ...(!href && { type: "button" }),
      },
      children
    );
  };
}
