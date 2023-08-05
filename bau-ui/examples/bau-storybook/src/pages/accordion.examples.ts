import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
import { Context } from "../context";

export default (context: Context) => {
  const { tr, bau, css } = context;
  const { section, div, h3, h2, p } = bau.tags;

  const AccordionContainer = (...children: any[]) =>
    div(
      {
        class: css`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `,
      },
      ...children
    );

  const accordionDefs: Accordion[] = [
    {
      name: "Item1",
      Header: () => div("Item 1"),
      Content: () => div(p("Item 1 Content")),
    },
    {
      name: "Item2",
      Header: () => div("Item 2"),
      Content: () => div(p("Item 2 Content")),
    },
    {
      name: "Item3",
      Header: () => div("Item 3"),
      Content: () => div(p("Item 3 content")),
    },
  ];

  const Accordion = accordion(context, { accordionDefs });

  return () =>
    section(
      { id: "accordion" },
      h2(tr("Accordion")),
      h3("Basic Accordion"),
      AccordionContainer(Accordion({})),
      h3("Accordion width: fit-content"),
      AccordionContainer(
        Accordion({
          class: css`
            &.accordion {
              & ul {
                & li {
                  width: fit-content;
                }
              }
            }
          `,
        })
      ),
      h3("Accordion icon cross"),
      AccordionContainer(
        Accordion({
          class: css`
            &.accordion {
              & ul {
                & li {
                  & header {
                    &::after {
                      content: "\u002B";
                    }
                  }
                  & header.active {
                    &::after {
                      transform: rotate(45deg);
                    }
                  }
                }
              }
            }
          `,
        })
      )
    );
};
