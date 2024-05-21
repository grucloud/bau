import { toPropsAndChildren } from "@grucloud/bau/bau.js";

export default function (context, options) {
  const { bau, css } = context;
  const { div } = bau.tags;
  const className = css`
    position: fixed;
    top: 80px;
    left: 0px;
    z-index: 2;
    & .overlay {
      position: fixed;
      visibility: hidden;
      z-index: -1;
      opacity: 0;
      background-color: var(--background-color);
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      transition: opacity var(--transition-fast) ease-out;
    }
    & .overlay-open {
      visibility: visible;
      z-index: 1;
      opacity: 0.5;
    }
    & .content {
      transform: translate(-100%, 0px);
      z-index: 2;
      position: absolute;
      box-shadow: var(--shadow-m);
      background-color: var(--background-color);
      top: 0;
      left: 0;
      transition: transform var(--transition-fast) ease-out;
    }
    & .content-open {
      transform: translate(0%, 0px);
      z-index: 2;
      position: absolute;
      box-shadow: var(--shadow-m);
      background-color: var(--background-color);
      top: 0;
      left: 0;
      transition: transform var(--transition-fast) ease-out;
    }
  `;

  return function Drawer(...args) {
    let [
      { color, variant = "outline", size, openState, ...props },
      ...children
    ] = toPropsAndChildren(args);
    return div(
      { class: [className, options?.class, props.class] },
      // Overlay
      div({
        class: () => ["overlay", openState.val && "overlay-open"],
        onclick: () => {
          openState.val = false;
        },
      }),
      // Content
      div(
        {
          class: () => ["content", openState.val && "content-open"],
        },
        children
      )
    );
  };
}
