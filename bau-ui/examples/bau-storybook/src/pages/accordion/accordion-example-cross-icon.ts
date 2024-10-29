import accordion from "@grucloud/bau-ui/accordion";
import { Context } from "@grucloud/bau-ui/context";

import { createAccordionDefs } from "./accordion-definitions";

export default (context: Context) => {
  const { css } = context;

  const accordionDefs = createAccordionDefs(context);
  const Accordion = accordion(context, {
    color: "success",
    variant: "outline",
    class: css`
      &.accordion {
        & ul {
          & li {
            .header {
              justify-content: space-between;
              &.close::before {
                content: none;
                width: 0;
              }
              &.open::before {
                content: "";
                width: 0;
              }
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
