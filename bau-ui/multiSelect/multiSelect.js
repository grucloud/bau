import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import popover from "../popover/popover.js";
import button from "../button/button.js";
import list from "../list/list.js";
import spinner from "../spinner/spinner.js";
import checkbox from "../checkbox/checkbox";
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
  const { div, li, select } = bau.tags;
  const Button = button(context);
  const Popover = popover(context);
  const List = list(context);
  const Checkbox = checkbox(context, { color: "neutral", variant: "outline" });

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
    & label {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      flex-grow: 1;
    }
    ${colorsToCss()}
  `;

  return function MultiSelect(...args) {
    let [
      {
        size = componentOptions.size ?? "md",
        variant = componentOptions.variant ?? "outline",
        color = componentOptions.color ?? "neutral",
        name,
        label,
        Option,
        options,
        defaultValue = [],
        getOptionLabel,
        getOptionValue,
        renderValue,
        onSelect = () => {},
        loading,
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);

    const Spinner = spinner(context, { variant, color, size });

    const selectedState = bau.state(defaultValue);
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

    const findOptions = () =>
      Array.from(selectEl.selectedOptions).map(({ value }) =>
        options.find((option) => getOptionValue(option) == value)
      );

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
            const checkbox =
              event.currentTarget.querySelectorAll("input")[
                itemIndexActive.val
              ];
            checkbox.checked = !checkbox.checked;
            const currentOption = selectEl.options[itemIndexActive.val + 1];
            currentOption.selected = !currentOption.selected;
            selectedState.val = findOptions();
          } else {
            dialogOpen();
          }
          break;
      }
    };

    const onChangeCheckbox = (opt) => (event) => {
      const option = [...selectEl.options].find(
        ({ value }) => value == getOptionValue(opt)
      );
      if (event.target.checked) {
        option.selected = true;
      } else {
        option.selected = false;
      }
      selectedState.val = findOptions();
    };

    const Content = () => {
      return List(
        { tabindex: "0", class: [color, variant] },
        options.map((option, index) =>
          li(
            {
              class: () => itemIndexActive.val == index && "active",
            },
            bau.tags.label(
              Checkbox({
                checked: defaultValue.find(
                  (v) => getOptionValue(v) == getOptionValue(option)
                ),
                name: `${name}-${getOptionValue(option)}`,
                onchange: onChangeCheckbox(option),
              }),
              Option(option)
            )
          )
        )
      );
    };

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
      () => (selectedState.val.length ? renderValue(selectedState.val) : label),
      () => loading == true && Spinner({ visibility: loading })
    );

    const popoverEl = Popover({
      triggerEl: buttonEl,
      contentEl: Content(),
      onClose,
    });
    // Hidden select, required to save the value.
    const selectEl = select(
      { name, multiple: true, ...props },
      bau.tags.option({ value: "" }, "--Category--"),
      options.map((option) =>
        bau.tags.option(
          {
            value: getOptionValue(option),
            selected: defaultValue.find(
              (v) => getOptionValue(v) == getOptionValue(option)
            ),
          },
          getOptionLabel(option)
        )
      )
    );

    return div(
      {
        ...props,
        class: [
          "multiSelect",
          color,
          size,
          className,
          componentOptions?.class,
          props?.class,
        ],
        onkeydown,
      },
      selectEl,
      buttonEl,
      popoverEl
    );
  };
}
