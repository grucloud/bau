import classNames from "@grucloud/bau-css/classNames.js";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import popover from "../popover/popover.js";
import button from "../button/button.js";
import input from "../input/input.js";
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
  const { div, li } = bau.tags;
  const className = css`
    position: relative;
    overflow: hidden;
    height: fit-content;
    & button {
      &::after {
        content: "\u25BC";
      }
      &.loading::after {
        display: none;
      }
    }
    & .content {
      display: flex;
      flex-direction: column;
      max-height: 100vh;
      overflow: hidden;
      & ul {
        border-width: 0px !important;
        overflow: auto;
      }
      & input {
        padding: 0.8rem;
        margin: 0.3rem;
      }
    }

    ${colorsToCss()}
  `;

  return function AutoComplete(...args) {
    let [
      {
        size = componentOptions.size ?? "md",
        variant = componentOptions.variant ?? "outline",
        color = componentOptions.color ?? "neutral",
        label,
        placeholder,
        Option,
        options,
        getOptionLabel = ({ label }) => label,
        onSelect = () => {},
        id,
        required,
        name,
        loading,
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);

    const Popover = popover(context);
    const Button = button(context);
    const Input = input(context, { variant, color, size });
    const List = list(context);
    const Spinner = spinner(context, { variant, color, size });

    const selectedState = bau.state(props.value);
    bau.derive(() => {
      if (selectedState.val) {
        inputShadowEl.value = getOptionLabel(selectedState.val);
        onSelect(selectedState.val);
      }
    });
    const inputState = bau.state("");
    const openState = bau.state(false);
    const itemIndexActive = bau.state(0);

    const onClose = () => {
      openState.val = false;
    };

    const optionsFilteredState = bau.state(options);

    const isOptionSelected = (selectedState) => (options) =>
      selectedState.val &&
      getOptionLabel(options) == getOptionLabel(selectedState.val);

    const dialogOpen = () => {
      popoverEl.openDialog();
      openState.val = true;
      inputState.val = "";
      optionsFilteredState.val = options;
      itemIndexActive.val = options.findIndex(isOptionSelected(selectedState));
      const activeEl = contentEl.querySelector("li.selected");
      if (activeEl) {
        activeEl.scrollIntoView({ block: "center" });
        inputEl.scrollIntoView({ block: "end" });
      }
    };

    const dialogClose = () => {
      popoverEl.closeDialog();
      openState.val = false;
      inputState.val = "";
      itemIndexActive.val = 0;
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
      popoverEl.open ? dialogClose() : dialogOpen();
    };

    const onclickItem =
      ({ option, index }) =>
      (event) => {
        selectedState.val = option;
        itemIndexActive.val = index;
        dialogClose();
      };

    const scrollIntoView = () => {
      const activeEl = contentEl.querySelector("li.active");
      if (activeEl) {
        activeEl.scrollIntoView({ block: "center", behavior: "smooth" });
      }
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
          scrollIntoView();

          break;
        case "ArrowUp":
          if (itemIndexActive.val <= 0) {
            itemIndexActive.val = optionsFilteredState.val.length - 1;
          } else {
            itemIndexActive.val--;
          }
          scrollIntoView();
          break;
        case "Enter":
          selectedState.val = optionsFilteredState.val[itemIndexActive.val];
          inputState.val = "";
          dialogClose();
          event.preventDefault();
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
        class: loading == true && "loading",
        disabled: loading,
      },
      () => (selectedState.val ? getOptionLabel(selectedState.val) : label),
      () => loading == true && Spinner({ visibility: loading })
    );

    const inputEl = Input({
      value: inputState,
      placeholder,
      autofocus: true,
      type: "search",
      autocomplete: "off",
      autocapitalize: "none",
      spellcheck: false,
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-expanded": openState,
      oninput,
      onkeydown,
      ...props,
    });

    const inputShadowEl = Input({
      class: css`
        width: 1px;
        opacity: 0;
        left: 0;
        bottom: 0;
        position: absolute;
      `,
      tabindex: -1,
      value: inputState,
      required,
      name,
    });

    const contentEl = div(
      { class: classNames(variant, color, size, "content") },
      inputEl,
      () =>
        List(
          { class: classNames(variant, color, size) },
          optionsFilteredState.val.map((option, index) =>
            li(
              {
                class: () =>
                  classNames(
                    itemIndexActive.val == index && "active",
                    isOptionSelected(selectedState)(option) && "selected"
                  ),
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
      contentEl,
      onClose,
      class: css`
        overflow: hidden;
      `,
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
      inputShadowEl,
      popoverEl
    );
  };
}
