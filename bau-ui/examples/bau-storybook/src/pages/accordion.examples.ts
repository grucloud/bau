import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
import { Context } from "@grucloud/bau-ui/context";
import componentGrid from "./componentGrid";

export default (context: Context) => {
  const { tr, bau, css } = context;
  const { article, div, h3, h2, h1, p } = bau.tags;

  const ComponentGrid = componentGrid(context);

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
      Header: () => "Item 1",
      Content: () => div(p("Item 1 Content")),
    },
    {
      name: "Item2",
      Header: () => "Item 2",
      Content: () => div(p("Item 2 Content")),
    },
    {
      name: "Item3",
      Header: () => "Item 3",
      Content: () => div(p("Item 3 content")),
    },
  ];

  const Accordion = accordion(context, { accordionDefs });

  return () =>
    article(
      { id: "accordion" },
      h1(tr("Accordion")),

      // pre(`import accordion from "@grucloud/bau-ui/accordion"`),
      h2("Accordion Table"),
      ComponentGrid({
        Item: (props: any) => Accordion({ ...props }),
      }),
      h2("Customization"),
      h3("Default Accordion"),
      AccordionContainer(Accordion({})),
      h3("Accordion width: fit-content"),
      AccordionContainer(
        Accordion({
          color: "warning",
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
          color: "success",
          variant: "outline",
          class: css`
            &.accordion {
              & ul {
                & li {
                  & h3 {
                    &::after {
                      content: "\u002B";
                    }
                  }
                  & h3.active {
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
