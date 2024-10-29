import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import { Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
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
      cursor: pointer;
      &:hover {
        color: var(--pink);
      }
      &::after {
        padding: 0.5rem;
        transition: transform var(--transition-fast) linear;
        line-height: 1rem;
      }
      &.close::after {
        content: url("./assets/images/icon-plus.svg");
        padding: 0.5rem;
      }
      &.open::after {
        content: url("./assets/images/icon-minus.svg");
        padding: 0.5rem;
      }
    }
    & .content {
      background-color: inherit;
      will-change: height;
      transition: height var(--transition-fast) ease-out;
      overflow-y: scroll;
      color: var(--Grayish-purple);
    }
  `;

  const collapseOrExpandSection = ({ element, closeState }: any) => {
    if (element.scrollHeight == 0) return;
    closeState.val ? collapseSection(element) : expandSection(element);
  };

  function collapseSection(element: HTMLElement) {
    element.style.height = element.scrollHeight + "px";
    const animationEndHandler = () => {
      element.removeEventListener("transitionend", animationEndHandler);
    };
    element.addEventListener("transitionend", animationEndHandler);
    window.requestAnimationFrame(() => {
      element.style.height = "0px";
    });
  }

  function expandSection(element: any) {
    const animationEndHandler = () => {
      element.removeEventListener("transitionend", animationEndHandler);
      element.style.height = null;
    };
    element.addEventListener("transitionend", animationEndHandler);
    element.style.height = element.scrollHeight + "px";
  }

  return function Collapsible(...args: any[]) {
    let [{ Header, Content, expanded = false, ...props }] =
      toPropsAndChildren(args);

    const closeState = bau.state(!expanded);
    return div(
      {
        ...props,
        class: ["collapsible", className, props?.class],
      },
      div(
        {
          class: () => [
            "header",
            Content ? (closeState.val ? "close" : "open") : "",
          ],
          onclick: () => {
            closeState.val = !closeState.val;
            //event.stopPropagation();
          },
        },
        Header()
      ),
      div(
        {
          class: "content",
          role: "region",
          bauMounted: ({ element }: { element: HTMLElement }) => {
            closeState.val && (element.style.height = "0px");
          },
          "aria-expanded": ({ element }: { element: HTMLElement }) => {
            collapseOrExpandSection({ element, closeState });
            return !closeState.val;
          },
        },
        Content && Content()
      )
    );
  };
}
