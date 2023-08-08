import classNames from "@grucloud/bau-css/classNames";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";

export default function (context, componentOptions) {
  const { bau, css } = context;
  const { div, dialog, ul, li, i, button } = bau.tags;

  const className = css`
    & button {
      cursor: pointer;
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
      border: 1px solid var(--color-emphasis-700);
      background: transparent;
      font-size: 1rem;
      font-weight: var(--font-weight-semibold);
      text-align: center;
      text-decoration: none;
      overflow: hidden;
      box-sizing: border-box;
      user-select: none;
      transition: background-color var(--transition-fast);
      &:hover {
        box-shadow: var(--shadow-s);
        background: var(--color-emphasis-50);
      }
      & label {
        color: var(--color-emphasis-700);
        cursor: pointer;
      }
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    & .dialog-box {
      position: relative;
      & dialog {
        top: 0.1rem;
        margin: 0;
        padding: 0;
        border: 1px var(--color-emphasis-400) solid;
        border-radius: var(--global-radius);
        box-shadow: var(--shadow-s);
        & ul {
          list-style: none;
          padding: 0;
          margin: 0;
          & li {
            border-radius: var(--global-radius);
            padding: 0.5rem;
            cursor: pointer;
            &:hover {
              background-color: var(--color-emphasis-50);
            }
          }
          & li.active {
            background-color: var(--color-emphasis-50);
          }
        }
      }
    }
  `;

  const inputState = bau.state("");
  const openState = bau.state(false);
  const itemIndexActive = bau.state(0);

  return function Select(...args) {
    let [
      {
        id,
        label,
        Option,
        options,
        getOptionLabel = ({ label }) => label,
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);

    const dialogOpen = () => {
      dialogEl.show();
      openState.val = true;
    };

    const dialogClose = () => {
      openState.val = false;
      dialogEl.close();
    };

    const onclickButton = (event) => {
      if (!openState.val) {
        dialogOpen();
      } else {
        dialogClose();
      }
    };

    const onclickItem = (option) => (event) => {
      inputState.val = getOptionLabel(option);
      dialogClose();
    };

    const onkeydown = (event) => {
      event.preventDefault();
      switch (event.key) {
        case "Escape":
          dialogClose();
          break;
        case "ArrowDown":
          itemIndexActive.val++;
          break;
        case "ArrowUp":
          itemIndexActive.val--;
          break;
        case "Enter":
          inputState.val = getOptionLabel(options[itemIndexActive.val]);
          dialogClose();
          break;
      }
    };

    const dialogEl = dialog(() =>
      ul(
        options.map((option, index) =>
          li(
            {
              class: () => classNames(itemIndexActive.val == index && "active"),
              onclick: onclickItem(option),
            },
            Option(option)
          )
        )
      )
    );

    return div(
      {
        ...props,
        class: classNames(
          "select",
          className,
          componentOptions?.class,
          props?.class
        ),
        onkeydown,
      },
      button(
        {
          type: "button",
          role: "combobox",
          "aria-autocomplete": "list",
          "aria-expanded": openState,
          onclick: onclickButton,
        },
        () => !inputState.val && bau.tags.label(label),
        inputState
      ),
      div({ class: "dialog-box" }, dialogEl)
    );
  };
}
