import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
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
    {
      name: "Item3",
      Header: () => "Item 3",
      Content: () => div(p("Item 3 content")),
    },
  ];

  const Accordion = accordion(context, { accordionDefs });
  return (props: any) => Accordion({ ...props });
};
