import classNames from "@grucloud/bau-css/classNames.js";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import popover from "../popover/popover.js";
import button from "../button/button.js";
import list from "../list/list.js";
import spinner from "../spinner/spinner.js";

import { Colors } from "../constants.js";

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

export default function (context, componentOptions = {}) {
  const { bau, css } = context;
  const { div, li, select, option } = bau.tags;
  const Button = button(context);
  const Popover = popover(context);
  const List = list(context);

  const className = css`
    & select {
      width: 0;
      height: 0;
      opacity: 0;
    }
    & button {
      &::after {
        content: "\u25BC";
      }
      &.loading::after {
        display: none;
      }
    }
    ${colorsToCss()}
  `;

  return function Select(...args) {
    let [
      {
        size = componentOptions.size ?? "md",
        variant = componentOptions.variant ?? "outline",
        color = componentOptions.color ?? "neutral",
        label,
        Option,
        options,
        defaultOption,
        getOptionLabel,
        getOptionValue,
        onSelect = () => {},
        loading,
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);

    const Spinner = spinner(context, { variant, color, size });

    const inputState = bau.state(
      defaultOption ? getOptionLabel(defaultOption) : label
    );
    const openState = bau.state(false);
    const itemIndexActive = bau.state(0);

    const dialogOpen = () => {
      popoverEl.openDialog();
      popoverEl.focus();
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
      popoverEl.open ? dialogClose() : dialogOpen();
      event.preventDefault();
    };

    const onclickItem =
      ({ option, index }) =>
      (event) => {
        inputState.val = getOptionLabel(option);
        selectEl.value = getOptionValue(option);
        selectEl.setCustomValidity("");
        itemIndexActive.val = index;
        dialogClose();
        onSelect(option);
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
          if (popoverEl.open) {
            inputState.val = getOptionLabel(options[itemIndexActive.val]);
            selectEl.value = getOptionValue(option);
            dialogClose();
          } else {
            dialogOpen();
          }
          break;
      }
    };

    const Content = () =>
      List(
        { tabindex: "0", class: classNames(color, variant) },
        options.map((option, index) =>
          li(
            {
              class: () => classNames(itemIndexActive.val == index && "active"),
              onclick: onclickItem({ option, index }),
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
        color,
        variant,
        size,
        class: loading == true && "loading",
        disabled: loading,
      },
      () => !inputState.val && label,
      inputState,
      () => loading == true && Spinner({ visibility: loading })
    );

    const popoverEl = Popover({
      // id,
      triggerEl: buttonEl,
      contentEl: Content(),
      onClose,
    });
    // Hidden select, required to save the value.
    const selectEl = select(
      props,
      option({ value: "" }, "--Select Category--"),
      options.map((opt) =>
        option({ value: getOptionValue(opt) }, getOptionLabel(opt))
      )
    );
    selectEl.value = props.value;

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
      selectEl,
      buttonEl,
      popoverEl
    );
  };
}
