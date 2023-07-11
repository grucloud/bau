import classNames from "@grucloud/bau-css/classNames";

const defaultMode = "light";

export default function (context) {
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
    width: 2.5rem;
    height: 2.5rem;
    border: 1px var(--color-gray-200) dotted;
    border-radius: var(--global-radius);
    appearance: none;
    transition: all var(--transition-fast);
    &:hover {
      cursor: pointer;
      border: 1px var(--color-primary) dotted;
      &::after {
        color: var(--color-primary);
      }
    }
    &::after {
      content: "\u2600";
      font-size: x-large;
      display: block;
      width: 100%;
      text-align: center;
      transition: all var(--transition-fast);
      color: var(--color-emphasis-400);
    }
    &:checked {
    }
    &:checked::after {
      content: "\u263D";
      font-size: xx-large;
    }
  `;

  return function ThemeSwitch(props, ...children) {
    return input(
      {
        ...props,
        class: classNames(style, props.class),
        type: "checkbox",
        required: "required",
        title: "Switch Theme",
        checked: getStoredTheme() == "dark",
        onclick: (event) => {
          setDataThemeAttribute(event.target.checked ? "dark" : "light");
        },
      },
      ...children
    );
  };
}
