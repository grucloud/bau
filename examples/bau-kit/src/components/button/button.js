import { css } from "goober";

import { classNames } from "../../utils/classNames";

export default function (context, options = {}) {
  const { theme, bau } = context;
  const { palette, shape, shadows } = theme;
  const { span } = bau.tags;

  const styles = {
    root: css`
      color: ${palette.text.primary};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 0 0.5rem;
      min-width: 4rem;
      min-height: 2.5rem;
      outline: none;
      border: none;
      border-radius: ${shape.borderRadius}px;
      background: transparent;
      font-size: 1rem;
      font-weight: 500;
      text-align: center;
      text-decoration: none;
      text-transform: uppercase;
      overflow: hidden;
      box-sizing: border-box;
      user-select: none;
      transition: background-color 0.3s;
      ::before {
        background-color: rgba(0, 0, 0, 0.2);
        position: absolute;
        top: calc(50% - 100%);
        left: calc(50% - 100%);
        width: 200%;
        height: 200%;
        transition: opacity 250ms linear;
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        content: "";
      }
      :active {
        ::before {
          opacity: 1;
        }
      }
      :hover {
        ::before {
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
      background-color: ${palette.primary.contrastText};
      color: ${palette.primary.main};
    `,
    flatAccent: css`
      background-color: ${palette.secondary.contrastText};
      color: ${palette.secondary.main};
    `,
    raised: css`
      box-shadow: ${shadows[2]};
      :active {
        box-shadow: ${shadows[8]};
      }
    `,
    raisedPrimary: css`
      background-color: ${palette.primary.main};
      color: ${palette.primary.contrastText};
    `,
    raisedAccent: css`
      background-color: ${palette.secondary.main};
      color: ${palette.secondary.contrastText};
    `,
    disabled: css`
      color: rgba(0, 0, 0, 0.26);
      cursor: default;
      pointer-events: none;
      box-shadow: ${shadows[0]};
    `,
    raisedDisabled: css`
      background-color: rgba(0, 0, 0, 0.12);
    `,
    fullWidth: css`
      text-align: center;
      width: 100%;
    `,
    label: css``,
    icon: css`
      padding: 0.4rem;
    `,
    ripple: css`
      position: relative;
      overflow: hidden;
      transform: translate3d(0, 0, 0);
      ::after {
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
        transition: transform 0.5s, opacity 1s;
      }
      :active::after {
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
          fullWidth && styles.fullWidth
        ),
        href,
        ...(!href && { type: "button" }),
        ...otherProps,
      },
      label && span({ class: styles.label }, label),
      icon && span({ class: styles.icon }, icon),
      children
    );
  };
}
