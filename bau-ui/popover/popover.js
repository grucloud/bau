import paper from "../paper";
import classNames from "@grucloud/bau-css/classNames.js";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";

export default function (context, options) {
  const { bau, css, window } = context;
  const { dialog } = bau.tags;
  const Paper = paper(context, {
    class: css`
      &.paper {
        padding: 0;
      }
    `,
  });

  const className = css`
    width: fit-content;
    margin: 0;
    background: var(--background-color);
    border: none;
    box-shadow: var(--shadow-m);
    padding: 0rem;
    margin: 0rem;
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
  `;

  return function Popover(...args) {
    let [{ contentEl, triggerEl, onClose, ...props }, ...children] =
      toPropsAndChildren(args);

    const openDialog = (event) => {
      dialogEl.style.opacity = 1;
      dialogEl.showModal();
      const rectAnchor = triggerEl.getBoundingClientRect();
      const rectDialog = dialogEl.getBoundingClientRect();
      if (rectAnchor.x < window.innerWidth / 2) {
        dialogEl.style.left = rectAnchor.left + "px";
      } else {
        dialogEl.style.left = rectAnchor.right - rectDialog.width + "px";
      }
      if (rectAnchor.y < window.innerHeight / 2) {
        dialogEl.style.top = rectAnchor.top + rectAnchor.height + "px";
      } else {
        dialogEl.style.top =
          Math.max(0, rectAnchor.top - rectDialog.height) + "px";
        if (dialogEl.scrollHeight > rectAnchor.top) {
          dialogEl.style.height = rectAnchor.top + "px";
        }
      }
    };

    const closeDialog = (event) => {
      const listener = () => {
        dialogEl.close();
        dialogEl.removeEventListener("transitionend", listener);
      };
      dialogEl.addEventListener("transitionend", listener);
      dialogEl.style.opacity = 0;
    };

    const dialogEl = dialog(
      {
        role: "presentation",
        class: classNames("popover", className, options?.class, props?.class),
        onclick: (event) => {
          event.target === dialogEl && (closeDialog(), onClose?.call());
        },
      },
      Paper(contentEl)
    );

    dialogEl.closeDialog = closeDialog;
    dialogEl.openDialog = openDialog;

    return dialogEl;
  };
}
