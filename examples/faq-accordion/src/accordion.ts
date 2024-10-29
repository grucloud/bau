import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import { Context } from "@grucloud/bau-ui/context";

import collapsible from "./collapsible";

export default function (context: Context, options = {}) {
  const { bau, css } = context;
  const { div, ul, li, h3, button } = bau.tags;

  const className = css`
    & ul {
      display: inline-flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 0;
      list-style: none;
      & li {
        display: flex;
        flex-direction: column;
        padding: 0 0.5rem;
        margin: 0.6rem;
        overflow: hidden;
        border-radius: var(--global-radius);
        transition: all var(--transition-slow) ease-out;
        background-color: inherit;
        &:hover {
          filter: brightness(var(--brightness-hover));
        }
        & h3 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0;
          & button {
            width: 100%;
            border: none;
            background-color: inherit;
            text-align: left;
            font-size: large;
            font-weight: bold;
            cursor: pointer;
            color: inherit;
          }
        }
        & h3.active {
          font-weight: var(--font-weight-semibold);
        }
      }
    }
  `;

  return function Accordion(...args) {
    let [{ data = [], ...props }] = toPropsAndChildren(args);

    const itemNameState = bau.state("");

    const Collapsible = collapsible(context, {});

    const onclick = (name: string) => () => {
      if (itemNameState.val == name) {
        itemNameState.val = "";
      } else {
        itemNameState.val = name;
      }
    };

    const AccordionItem = (item) => {
      const { Header, Content, name } = item;
      const AccordionHeader = () =>
        h3(
          {
            class: () => itemNameState.val == name && "active",
          },
          button(
            {
              type: "button",
              "aria-controls": `bau-${name}`,
              "aria-expanded": () => itemNameState.val == name,
            },
            Header(item)
          )
        );

      const AccordionContent = () =>
        div(
          {
            id: `bau-${name}`,
            "data-state": () => {
              const open = itemNameState.val == name;
              return open;
            },
          },
          Content(item)
        );

      return li(
        {
          onclick: onclick(name),
        },
        Collapsible({ Header: AccordionHeader, Content: AccordionContent })
      );
    };
    return div(
      {
        class: ["accordion", className, props.class],
      },
      ul(data.map(AccordionItem))
    );
  };
}
