import classNames from "@grucloud/bau-css/classNames.js";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import popover from "../popover/popover.js";
import button from "../button/button.js";
import input from "../input/input.js";
import list from "../list/list.js";

import { Colors } from "../constants";

const colorsToCss = () =>
  Colors.map(
    (color) =>
      `
& button.plain.${color}::after {
  color: var(--color-${color});
}
& button.outline.${color}::after {
  color: var(--color-${color});
}
  `
  ).join("\n");

export default function (context, componentOptions) {
  const { bau, css } = context;
  const { div, li, ul } = bau.tags;

  const Popover = popover(context);
  const Button = button(context);
  const Input = input(context);
  const List = list(context);

  const className = css`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0 0.3rem;
      }
    }
    & .content {
      height: fit-content;
      & input {
        padding: 0.8rem;
        margin: 0.3rem;
      }
    }
    ${colorsToCss()}
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
        variant = "outline",
        color,
        size,
        id,
        label,
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
      } else {
        optionsFilteredState.val = options;
      }
    };

    const onclickButton = (event) => {
      if (!openState.val) {
        dialogOpen();
      } else {
        dialogClose();
      }
    };

    const onclickItem =
      ({ option, index }) =>
      (event) => {
        selectedState.val = getOptionLabel(option);
        itemIndexActive.val = index;
        dialogClose();
      };

    const onkeydown = (event) => {
      console.log("onkeydown", event.key, itemIndexActive.val);
      switch (event.key) {
        case "Escape":
          dialogClose();
          break;
        case "ArrowDown":
          if (itemIndexActive.val < optionsFilteredState.val.length - 1) {
            itemIndexActive.val++;
          } else {
            itemIndexActive.val = 0;
          }
          break;
        case "ArrowUp":
          if (itemIndexActive.val <= 0) {
            itemIndexActive.val = optionsFilteredState.val.length - 1;
          } else {
            itemIndexActive.val--;
          }
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

    const buttonEl = Button(
      {
        type: "button",
        role: "combobox",
        "aria-autocomplete": "list",
        "aria-expanded": openState,
        "aria-label": label,
        onclick: onclickButton,
        variant,
        color,
        size,
      },
      () => !selectedState.val && label,
      selectedState
    );

    const inputEl = Input({
      id,
      value: inputState,
      placeholder,
      autofocus: true,
      type: "search",
      autocomplete: "new-password",
      autocapitalize: "none",
      spellcheck: false,
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-expanded": openState,
      oninput,
      onkeydown,
      variant,
      color,
      size,
    });

    const Content = () =>
      div({ class: classNames(variant, color, size, "content") }, inputEl, () =>
        List(
          { class: classNames(variant, color, size) },
          optionsFilteredState.val.map((option, index) =>
            li(
              {
                class: () =>
                  classNames(itemIndexActive.val == index && "active"),
                onclick: onclickItem({ option, index }),
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
      buttonEl,
      popoverEl
    );
  };
}
