import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames.js";
import { Colors } from "../constants.js";

const defaultMode = "light";

const colorsToCss = () =>
  Colors.map(
    (color) =>
      `
&.theme-switch.outline.${color} {
  color: var(--color-${color})
}
`
  ).join("\n");

export default function (context, options = {}) {
  const { bau, css, window } = context;
  const { input } = bau.tags;

  const setDataThemeAttribute = (theme) => {
    window.document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  const getStoredTheme = () => {
    try {
      return localStorage.getItem("theme");
    } catch (err) {}
  };

  const storedTheme = getStoredTheme();
  if (storedTheme) {
    setDataThemeAttribute(storedTheme);
  } else {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDataThemeAttribute("dark");
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setDataThemeAttribute("light");
    } else {
      setDataThemeAttribute(defaultMode);
    }
  }

  const className = css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--global-radius);
    appearance: none;
    transition: all var(--transition-fast);
    &:hover {
      cursor: pointer;
    }
    &::after {
      content: "\u2600";
      font-size: x-large;
      transition: all var(--transition-fast);
    }
    &:checked {
    }
    &:checked::after {
      content: "\u263D";
      font-size: x-large;
    }
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
    &:hover.solid {
      filter: brightness(var(--brightness-hover-always));
    }
    &.sm {
      width: 1.7rem;
      height: 1.7rem;
    }
    &.sm::after {
      font-size: 1rem;
    }
    &.md {
      width: 2rem;
      height: 2rem;
    }
    &.md::after {
      font-size: 1.5rem;
    }
    &.lg {
      width: 3rem;
      height: 3rem;
    }
    &.lg::after {
      font-size: 2.3rem;
    }
    ${colorsToCss()}
  `;

  return function ThemeSwitch(...args) {
    let [
      {
        size = options.size ?? "md",
        variant = options.variant ?? "plain",
        color = options.color ?? "neutral",
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);

    return input(
      {
        required: "required",
        title: "Switch Theme",
        ...props,
        class: classNames(
          "theme-switch",
          color,
          variant,
          size,
          className,
          options?.class,
          props.class
        ),
        type: "checkbox",
        checked: getStoredTheme() == "dark",
        onclick: (event) => {
          setDataThemeAttribute(event.target.checked ? "dark" : "light");
        },
      },
      ...children
    );
  };
}
