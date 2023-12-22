import accordion from "@grucloud/bau-ui/accordion";
import { Context } from "@grucloud/bau-ui/context";
import { createAccordionDefs } from "./accordion-definitions";

export default (context: Context) => {
  const { css } = context;

  const accordionDefs = createAccordionDefs(context);

  const Accordion = accordion(context, {
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

  return () => {
    return Accordion({
      data: accordionDefs,
    });
  };
};
