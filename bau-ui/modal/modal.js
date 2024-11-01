import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import { Colors } from "../constants.js";

export default function (context, options = {}) {
  const { bau, css, window } = context;
  const { dialog, div } = bau.tags;

  const colorsToCss = () =>
    Colors.map(
      (color) =>
        `
&.modal.plain.${color} {
  color: inherit;
}
&.modal.outline.${color} {
  color: inherit;
}
&.modal.soft.${color} {
  color: inherit;
}
&.modal.solid.${color} {
}
`
    ).join("\n");

  const className = css`
    margin: auto;
    padding: 1rem;
    box-shadow: var(--shadow-s);
    background-color: var(--background-color);
    border-radius: var(--global-radius);
    min-width: 400px;
    border: 0px;
    overflow: hidden;

    &,
    &::backdrop {
      transition: display 0.3s allow-discrete, overlay 0.3s allow-discrete,
        opacity 0.3s;
      opacity: 0;
    }
    &[open],
    &[open]::backdrop {
      opacity: 1;
      @starting-style {
        opacity: 0;
      }
    }

    > form {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: 100%;
      max-height: 96vh;
      max-width: 96vw;
      & > header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
      }
      & > main,
      > section,
      > article {
        overflow-y: auto;
        flex-grow: 1;
      }
      & > footer {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
      }
    }
    &.sm {
      max-height: 50vh;
      max-width: 50vw;
    }
    &.md {
    }
    &.lg {
      height: 96vh;
      width: 96vw;
    }
    ${colorsToCss()}
  `;

  return function Modal(...args) {
    let [
      {
        size = options.size ?? "md",
        variant = options.variant ?? "plain",
        color = options.color ?? "neutral",
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);

    const dialogEl = dialog(
      {
        ...props,
        bauMounted: () => {
          const search = new URLSearchParams(window.location.search);
          const modalId = search.get("modal");
          if (modalId == (props.id ?? "modal")) {
            dialogEl.showModal();
          }
        },
        class: [
          "modal",
          className,
          color,
          variant,
          size,
          options?.class,
          props?.class,
        ],
      },
      children
    );

    const observer = new MutationObserver((events) => {
      const search = new URLSearchParams(window.location.search);
      if (events[0].attributeName == "open") {
        if (dialogEl.open) {
          search.set("modal", dialogEl.id ?? "modal");
        } else {
          search.delete("modal");
        }
        window.history.pushState("", "", `?${search.toString()}`);
      }
    });
    observer.observe(dialogEl, { attributes: true });

    return dialogEl;
  };
}
