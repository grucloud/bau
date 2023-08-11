import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames";

export default function (context, options) {
  const { bau, css } = context;
  const { accordionDefs } = options;
  const { div, ul, li, header, h3, button } = bau.tags;
  const itemNameState = bau.state("");

  const itemByName = (name) => accordionDefs.find((item) => item.name == name);

  const onclick = (name) => (event) => {
    if (itemNameState.val == name) {
      itemNameState.val = "";
    } else {
      itemNameState.val = name;
    }
  };
  const collapseOrExpandSection = ({ element, open }) => {
    const animationEndHandler = () => {
      element.removeEventListener("transitionend", animationEndHandler);
    };

    function collapseSection(element) {
      element.addEventListener("transitionend", animationEndHandler);
      window.requestAnimationFrame(() => {
        element.style.height = "0px";
      });
    }

    function expandSection(element) {
      element.addEventListener("transitionend", animationEndHandler);
      element.style.height = element.scrollHeight + "px";
    }

    if (element.scrollHeight == 0) return;
    open ? expandSection(element) : collapseSection(element);
  };

  const className = css`
    & ul {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 0;
      list-style: none;
      & li {
        display: flex;
        flex-direction: column;
        padding: 0.5rem;
        margin: 0.2rem;
        overflow: hidden;
        border: 1px solid var(--color-emphasis-200);
        border-radius: var(--global-radius);
        transition: all var(--transition-slow) ease-out;
        &:hover {
          border-color: var(--color-emphasis-500);
        }
        & h3 {
          display: flex;
          cursor: pointer;
          align-items: center;
          justify-content: space-between;
          margin: 0;
          &::after {
            content: "\u203A";
            transition: all var(--transition-slow) ease-out;
          }
          & button {
            width: 100%;
            border: none;
            background-color: transparent;
            text-align: left;
            font-size: large;
            cursor: pointer;
            color: inherit;
          }
        }
        & h3.active {
          font-weight: var(--font-weight-semibold);
          &::after {
            content: "\u203A";
            transform: rotate(90deg);
          }
        }
        & .content {
          height: 0px;
          will-change: height;
          transition: height var(--transition-fast) ease-out;
        }
      }
    }
  `;

  return function Accordion(...args) {
    let [{ color, variant = "outline", size, content, ...props }, ...children] =
      toPropsAndChildren(args);
    const AccordionItem = (item) => {
      const { Header, Content, name } = item;
      return li(
        {
          class: classNames(color, variant, size),
          onclick: onclick(name),
        },
        h3(
          {
            class: () => classNames(itemNameState.val == name && "active"),
          },
          button(
            {
              type: "button",
              "aria-controls": `bau-${name}`,
              "aria-expanded": ({ element }) => itemNameState.val == name,
            },
            Header(item)
          )
        ),
        div(
          {
            class: "content",
            role: "region",
            id: `bau-${name}`,
            "data-state": ({ element }) => {
              const open = itemNameState.val == name;
              collapseOrExpandSection({ element, open });
              return open;
            },
          },
          Content(item)
        )
      );
    };
    return div(
      {
        class: classNames("accordion", className, options?.class, props.class),
      },
      ul(accordionDefs.map(AccordionItem))
    );
  };
}
