import classNames from "@grucloud/bau-css/classNames.js";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import popover from "../popover/popover.js";
import button from "../button/button.js";

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
& button.solid.${color}:hover {
  filter: brightness(var(--brightness));
}
`
  ).join("\n");

export default function (context, componentOptions) {
  const { bau, css } = context;
  const { div, ul, li } = bau.tags;
  const Button = button(context);
  const Popover = popover(context);

  const className = css`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    & ul {
      list-style: none;
      padding: 0;
      margin: 0;
      & li {
        padding: 0.5rem;
        cursor: pointer;
        background-color: inherit;
        &:hover {
          filter: brightness(var(--brightness-hover));
        }
      }
      & li.active {
        filter: brightness(var(--brightness-active));
      }
    }
    ${colorsToCss()}
  `;

  const inputState = bau.state("");
  const openState = bau.state(false);
  const itemIndexActive = bau.state(0);

  return function Select(...args) {
    let [
      {
        color = "neutral",
        variant = "outline",
        size,
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
      popoverEl.openDialog();
      openState.val = true;
    };

    const dialogClose = () => {
      popoverEl.closeDialog();
      openState.val = false;
    };

    const onClose = () => {
      openState.val = false;
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
          if (itemIndexActive.val < options.length - 1) {
            itemIndexActive.val++;
          } else {
            itemIndexActive.val = 0;
          }
          break;
        case "ArrowUp":
          if (itemIndexActive.val <= 0) {
            itemIndexActive.val = options.length - 1;
          } else {
            itemIndexActive.val--;
          }
          break;
        case "Enter":
          if (openState.val) {
            inputState.val = getOptionLabel(options[itemIndexActive.val]);
            dialogClose();
          } else {
            dialogOpen();
          }
          break;
      }
    };

    const Content = () =>
      ul(
        { class: classNames(color, variant) },
        options.map((option, index) =>
          li(
            {
              class: () => classNames(itemIndexActive.val == index && "active"),
              onclick: onclickItem(option),
            },
            Option(option)
          )
        )
      );

    const buttonEl = Button(
      {
        type: "button",
        role: "combobox",
        "aria-autocomplete": "list",
        "aria-expanded": openState,
        "aria-label": label,
        onclick: onclickButton,
        class: classNames(color, variant, size),
      },
      () => !inputState.val && label,
      inputState
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
          "select",
          color,
          size,
          className,
          componentOptions?.class,
          props?.class
        ),
        onkeydown,
      },
      buttonEl,
      popoverEl
    );
  };
}