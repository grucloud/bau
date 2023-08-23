import classNames from "@grucloud/bau-css/classNames.js";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";

export default function (context, options) {
  const { bau, css } = context;
  const { div } = bau.tags;
  const className = css`
    overflow: hidden;
    background-color: inherit;
    display: flex;
    flex-direction: column;
    & .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: inherit;
      &::after {
        padding: 0.5rem;
        transition: transform var(--transition-fast) linear;
        line-height: 1rem;
      }
      &.close::after {
        content: "\u203A";
        padding: 0.5rem;
      }
      &.open::after {
        content: "\u203A";
        padding: 0.5rem;
        transform: rotate(90deg);
      }
    }
    & .content {
      background-color: inherit;
      will-change: height;
      transition: height var(--transition-fast) ease-out;
      overflow-y: scroll;
    }
  `;

  const collapseOrExpandSection = ({ element, closeState }) => {
    if (element.scrollHeight == 0) return;
    closeState.val ? collapseSection(element) : expandSection(element);
  };

  function collapseSection(element) {
    element.style.height = element.scrollHeight + "px";
    const animationEndHandler = () => {
      element.removeEventListener("transitionend", animationEndHandler);
    };
    element.addEventListener("transitionend", animationEndHandler);
    window.requestAnimationFrame(() => {
      element.style.height = "0px";
    });
  }

  function expandSection(element) {
    const animationEndHandler = () => {
      element.removeEventListener("transitionend", animationEndHandler);
      element.style.height = null;
    };
    element.addEventListener("transitionend", animationEndHandler);
    element.style.height = element.scrollHeight + "px";
  }

  return function Collapsible(...args) {
    let [
      {
        color,
        variant = "plain",
        size = "md",
        Header,
        Content,
        close = true,
        ...props
      },
    ] = toPropsAndChildren(args);

    const closeState = bau.state(close);

    return div(
      {
        ...props,
        class: classNames(
          "collapsible",
          size,
          className,
          options?.class,
          props?.class
        ),
      },
      div(
        {
          class: () =>
            classNames(
              "header",
              Content ? (closeState.val ? "close" : "open") : ""
            ),
          onclick: (event) => {
            closeState.val = !closeState.val;
            event.stopPropagation();
          },
        },
        Header()
      ),
      div(
        {
          class: "content",
          role: "region",
          bauMounted: ({ element }) => {
            closeState.val && (element.style.height = "0px");
          },
          "aria-expanded": ({ element }) => {
            collapseOrExpandSection({ element, closeState });
            return !closeState.val;
          },
        },
        Content && Content()
      )
    );
  };
}
