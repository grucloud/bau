import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames.js";
import collapsible from "../collapsible";
import { Colors } from "../constants.js";

const colorsToCss = () =>
  Colors.map(
    (color) =>
      `
& li.plain.${color} h3::after {
  color: var(--color-${color});
}
& li.outline.${color} h3::after {
  color: var(--color-${color});
}
& h3.solid.${color}:hover {
  filter: brightness(var(--brightness-hover-always));
}
`
  ).join("\n");

export default function (context, options = {}) {
  const { bau, css } = context;
  const { div, ul, li, h3, button } = bau.tags;

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
        padding: 0 0.5rem;
        margin: 0.2rem;
        overflow: hidden;
        border-radius: var(--global-radius);
        transition: all var(--transition-slow) ease-out;
        background-color: inherit;
        &:hover.solid {
          filter: brightness(var(--brightness-hover-always)) !important;
        }
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
            cursor: pointer;
            color: inherit;
          }
        }
        & h3.active {
          font-weight: var(--font-weight-semibold);
        }
      }
    }
    ${colorsToCss()}
  `;

  return function Accordion(...args) {
    let [
      {
        size = options.size ?? "md",
        variant = options.variant ?? "plain",
        color = options.color ?? "neutral",
        data = [],
        ...props
      },
    ] = toPropsAndChildren(args);

    const itemNameState = bau.state("");

    const Collapsible = collapsible(context);

    const onclick = (name) => (event) => {
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
        );

      const AccordionContent = () =>
        div(
          {
            id: `bau-${name}`,
            "data-state": ({ element }) => {
              const open = itemNameState.val == name;
              return open;
            },
          },
          Content(item)
        );

      return li(
        {
          class: classNames(color, variant, size),
          onclick: onclick(name),
        },
        Collapsible({ Header: AccordionHeader, Content: AccordionContent })
      );
    };
    return div(
      {
        class: classNames("accordion", className, options?.class, props.class),
      },
      ul(data.map(AccordionItem))
    );
  };
}
