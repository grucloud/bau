import classNames from "@grucloud/bau-css/classNames";

export default function (context, { accordionDefs }) {
  const { bau, css } = context;
  const { div, ul, li, header } = bau.tags;
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
        & header {
          display: flex;
          cursor: pointer;
          align-items: center;
          justify-content: space-between;
          &::after {
            content: "\u203A";
            transition: all var(--transition-slow) ease-out;
          }
        }
        & header.active {
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

  return function Accordion(props) {
    const AccordionItem = (item) => {
      const { Header, Content, name } = item;
      return li(
        {
          onclick: onclick(name),
        },
        header(
          {
            class: () => classNames(itemNameState.val == name && "active"),
          },
          Header(item)
        ),
        div(
          {
            class: "content",
            "aria-expanded": ({ element }) => {
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
      { class: classNames("accordion", className, props.class) },
      ul(accordionDefs.map(AccordionItem))
    );
  };
}
