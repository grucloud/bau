import classNames from "@grucloud/bau-css/classNames";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import popover from "../popover/popover.js";

export default function (context, componentOptions) {
  const { bau, css } = context;
  const { div, input, ul, li, i, span, button } = bau.tags;

  const Popover = popover(context);

  const className = css`
    & button {
      cursor: pointer;
      color: var(--font-color-base);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 0.7rem 0.5rem;
      min-width: 2rem;
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
        padding: 0 0.3rem;
      }
    }

    & label {
      display: block;
    }
    & .content {
      & input {
        min-height: 2rem;
        padding: 0.8rem;
        margin: 0.3rem;
        outline: none;
        font-size: 1rem;
        border: 2px solid var(--color-emphasis-700);
        border-radius: var(--global-radius);
      }
      & ul {
        list-style: none;
        padding: 0;
        margin: 0rem 0;
        & li {
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
  `;

  const selectedState = bau.state("");
  const inputState = bau.state("");
  const openState = bau.state(false);
  const itemIndexActive = bau.state(0);

  const onClose = () => {
    openState.val = false;
  };

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
      popoverEl.openDialog();
      openState.val = true;
      inputState.val = "";
      optionsFilteredState.val = options;
    };

    const dialogClose = () => {
      popoverEl.closeDialog();
      openState.val = false;
      inputState.val = "";
    };

    const oninput = (event) => {
      const { value } = event.target;
      inputState.val = value;
      if (value) {
        optionsFilteredState.val = options.filter((option) =>
          getOptionLabel(option).match(new RegExp(`${value}`, "i"))
        );
        // dialogOpen();
      } else {
        optionsFilteredState.val = options;
      }
    };

    const onclickButton = (event) => {
      console.log("onclickButton", openState.val);
      if (!openState.val) {
        dialogOpen();
      } else {
        dialogClose();
      }
    };

    const onclickItem = (option) => (event) => {
      selectedState.val = getOptionLabel(option);
      dialogClose();
    };

    const onkeydown = (event) => {
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
          selectedState.val = getOptionLabel(
            optionsFilteredState.val[itemIndexActive.val]
          );
          inputState.val = "";
          dialogClose();
          break;
      }
    };

    const buttonEl = button(
      {
        type: "button",
        role: "combobox",
        "aria-autocomplete": "list",
        "aria-expanded": openState,
        onclick: onclickButton,
      },
      () => !selectedState.val && bau.tags.label(label),
      selectedState
    );

    const inputEl = input({
      id,
      value: inputState,
      placeholder,
      type: "search",
      autocomplete: "new-password",
      autocapitalize: "none",
      spellcheck: false,
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-expanded": openState,
      oninput,
      onkeydown,
    });

    const Content = () =>
      div({ class: "content" }, inputEl, () =>
        ul(
          optionsFilteredState.val.map((option, index) =>
            li(
              {
                class: () =>
                  classNames(itemIndexActive.val == index && "active"),
                onclick: onclickItem(option),
              },
              Option(option)
            )
          )
        )
      );

    const popoverEl = Popover({
      id,
      triggerEl: buttonEl,
      contentEl: Content(),
      onClose,
    });

    return div(
      {
        ...props,
        class: classNames(
          "autocomplete",
          className,
          componentOptions?.class,
          props?.class
        ),
      },
      bau.tags.label({ for: id }, label),
      buttonEl,
      // span(
      //   { class: "input-box", onclick: onclickIcon },
      //   inputEl,
      //   () =>
      //     !inputState.val &&
      //     i(
      //       {
      //         role: "button",
      //         "aria-label": "Open",
      //         title: "Open",
      //       },
      //       "\u25BC"
      //     )
      // ),
      popoverEl
    );
  };
}
