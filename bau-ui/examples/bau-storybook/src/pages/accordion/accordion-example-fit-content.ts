import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
import { Context } from "@grucloud/bau-ui/context";

const createAccordionDefs = (context: Context): Accordion[] => {
  const { bau } = context;
  const { div, p } = bau.tags;

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
  ];
  return accordionDefs;
};

export default (context: Context) => {
  const { css } = context;
  const accordionDefs = createAccordionDefs(context);
  const Accordion = accordion(context, { accordionDefs });
  return Accordion({
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
  });
};
