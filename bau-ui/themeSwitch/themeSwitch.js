import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames";

const defaultMode = "light";

export default function (context, options) {
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

  const style = css`
    position: relative;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    //border: 1px var(--color-gray-200) dotted;
    border-radius: var(--global-radius);
    appearance: none;
    transition: all var(--transition-fast);
    &:hover {
      cursor: pointer;
      //border: 1px var(--color-primary) dotted;
      &::after {
        // color: var(--color-primary);
      }
    }
    &::after {
      content: "\u2600";
      font-size: x-large;
      transition: all var(--transition-fast);
      //color: var(--color-emphasis-400);
    }
    &:checked {
    }
    &:checked::after {
      content: "\u263D";
      font-size: x-large;
    }
  `;

  return function ThemeSwitch(...args) {
    let [{ color, variant = "outline", size, ...props }, ...children] =
      toPropsAndChildren(args);

    return input(
      {
        required: "required",
        title: "Switch Theme",
        ...props,
        class: classNames(
          style,
          color,
          variant,
          size,
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
