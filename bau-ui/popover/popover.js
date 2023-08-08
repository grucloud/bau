import classNames from "@grucloud/bau-css/classNames";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";

export default function (context, options) {
  const { bau, css } = context;
  const { dialog, div } = bau.tags;

  const className = css`
    & dialog {
      display: grid;
      background: var(--background-color);
      border: none;
      box-shadow: var(--shadow-m);
      padding: 0.5rem;
      margin: 0rem;
      transition: opacity 0.3s ease-in-out;
      &::backdrop {
        background: var(--background-color);
      }
    }
    & dialog[open] {
      opacity: 1;
    }
    & dialog:not([open]) {
      pointer-events: none;
      opacity: 0;
    }
  `;

  return function Popover(...args) {
    let [{ Content, Trigger, ...props }, ...children] =
      toPropsAndChildren(args);

    const closeDialog = () => {
      dialogEl.style.opacity = 0;
      const listener = () => {
        dialogEl.style.opacity = null;
        dialogEl.close();
        dialogEl.removeEventListener("transitionend", listener);
      };
      dialogEl.addEventListener("transitionend", listener);
    };

    const triggerEl = Trigger();
    const contentEl = Content();
    const dialogEl = dialog(
      {
        role: "presentation",
        onclick: (event) => event.target === dialogEl && closeDialog(),
      },
      contentEl
    );

    triggerEl.onclick = (event) => {
      dialogEl.showModal();
      const rectAnchor = event.target.getBoundingClientRect();
      const rectDialog = dialogEl.getBoundingClientRect();

      if (rectAnchor.x < window.innerWidth / 2) {
        dialogEl.style.left = rectAnchor.left + "px";
      } else {
        dialogEl.style.left = rectAnchor.right - rectDialog.width + "px";
      }

      if (rectAnchor.y < window.innerHeight / 2) {
        dialogEl.style.top = rectAnchor.top + rectAnchor.height + "px";
      } else {
        dialogEl.style.top = rectAnchor.top - rectDialog.height + "px";
      }
    };

    return div(
      {
        ...props,
        class: classNames("popover", className, options?.class, props?.class),
      },
      triggerEl,
      dialogEl
    );
  };
}
