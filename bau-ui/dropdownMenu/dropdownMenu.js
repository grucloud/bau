import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import popover from "../popover/popover.js";
import button from "../button/button.js";
import list from "../list/list.js";

import { Colors } from "../constants.js";

const colorsToCss = () =>
  Colors.map(
    (color) =>
      `
`
  ).join("\n");

export default function (context, componentOptions = {}) {
  const { bau, css } = context;
  const { div, li } = bau.tags;
  const Button = button(context);
  const Popover = popover(context);
  const List = list(context);

  const className = css`
    ${colorsToCss()}
  `;

  return function DropdownMenu(...args) {
    let [
      {
        size = componentOptions.size ?? "md",
        variant = componentOptions.variant ?? "outline",
        color = componentOptions.color ?? "neutral",
        label,
        ListItem,
        items,
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);

    const itemIndexActive = bau.state(0);

    const dialogOpen = () => {
      popoverEl.openDialog();
      popoverEl.focus();
    };

    const dialogClose = () => {
      popoverEl.closeDialog();
    };

    const toggleDialog = () => {
      popoverEl.open ? dialogClose() : dialogOpen();
    };

    const onclickButton = (event) => {
      toggleDialog();
      event.preventDefault();
    };

    const onclickItem =
      ({ item, index }) =>
      (event) => {
        itemIndexActive.val = index;
        dialogClose();
        event.preventDefault();
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
          toggleDialog();
          break;
      }
    };

    const Content = () =>
      List(
        { tabindex: "0", class: [color, variant] },
        items.map((item, index) =>
          li(
            {
              class: () => [itemIndexActive.val == index && "active"],
              onclick: onclickItem({ item, index }),
            },
            ListItem(item)
          )
        )
      );

    const buttonEl = Button(
      {
        type: "button",
        onclick: onclickButton,
        color,
        variant,
        size,
      },
      label
    );

    const popoverEl = Popover({
      triggerEl: buttonEl,
      contentEl: Content(),
    });

    return div(
      {
        ...props,
        class: [
          "dropdownMenu",
          color,
          size,
          className,
          componentOptions?.class,
          props?.class,
        ],
        onkeydown,
      },
      buttonEl,
      popoverEl
    );
  };
}
