import classNames from "@grucloud/bau-css/classNames";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";

export default function (context, componentOptions) {
  const { bau, css } = context;
  const { div, input, dialog, ul, li, i, span } = bau.tags;

  const className = css`
    & label {
      display: block;
    }
    & .input-box {
      display: flex;
      align-items: center;
      &:hover > input {
        border: 1px solid var(--color-emphasis-700);
      }
      &:hover > i {
        color: var(--color-emphasis-700);
      }
      & input {
        &:active {
          border: 1px solid var(--color-emphasis-700);
        }
        padding: 0.7rem;
        outline: none;
        font-size: 1rem;
        border: 1px solid var(--color-emphasis-400);
        border-radius: var(--global-radius);
      }
      & i {
        margin-left: -1.5rem;
        cursor: pointer;
        color: var(--color-emphasis-400);
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
          margin: 0rem 0;
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

  return function AutoComplete(...args) {
    let [
      {
        id,
        label,
        size,
        placeholder,
        Option,
        options,
        getOptionLabel = ({ label }) => label,
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);

    const optionsFilteredState = bau.state(options);

    const dialogOpen = () => {
      dialogEl.show();
      dialogEl.style.width = inputEl.getBoundingClientRect().width + "px";
      inputEl.focus();
      openState.val = true;
    };

    const dialogClose = () => {
      dialogEl.close();
      openState.val = false;
    };

    const oninput = (event) => {
      const { value } = event.target;
      inputState.val = value;
      if (value) {
        dialogOpen();
        optionsFilteredState.val = options.filter((option) =>
          getOptionLabel(option).match(new RegExp(`${value}`, "i"))
        );
      } else {
        optionsFilteredState.val = options;
      }
    };

    const onclickIcon = (event) => {
      if (dialogEl.open) {
        dialogClose();
      } else {
        dialogOpen();
      }
    };

    const onclickItem = (option) => (event) => {
      inputState.val = getOptionLabel(option);
      dialogClose();
    };

    const onkeydown = (event) => {
      switch (event.key) {
        case "ArrowDown":
          itemIndexActive.val++;
          break;
        case "ArrowUp":
          itemIndexActive.val--;
          break;
        case "Enter":
          inputState.val = getOptionLabel(
            optionsFilteredState.val[itemIndexActive.val]
          );
          dialogClose();
          break;
      }
    };

    const inputEl = input({
      id,
      value: inputState,
      placeholder,
      type: "search",
      size,
      autocomplete: "new-password",
      autocapitalize: "none",
      spellcheck: false,
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-expanded": openState,
      oninput,
    });

    const dialogEl = dialog(() =>
      ul(
        optionsFilteredState.val.map((option, index) =>
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
          "autocomplete",
          className,
          componentOptions?.class,
          props?.class
        ),
        onkeydown,
      },
      bau.tags.label({ for: id }, label),
      span(
        { class: "input-box", onclick: onclickIcon },
        inputEl,
        () =>
          !inputState.val &&
          i(
            {
              role: "button",
              "aria-label": "Open",
              title: "Open",
            },
            "\u25BC"
          )
      ),
      div({ class: "dialog-box" }, dialogEl)
    );
  };
}
