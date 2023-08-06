declare module "@grucloud/bau-ui/accordion" {
  export type AccordionProps = {};

  type Component = import("../bau-ui").Component<AccordionProps>;

  type AccordionItemPropBase = {
    name: string;
  };

  type AccordionItem =
    import("../bau-ui").ComponentWithProp<AccordionItemPropBase>;

  export type Accordion = {
    Header: AccordionItem;
    Content: AccordionItem;
  } & AccordionItemPropBase;

  type Option = {
    class?: string;
    accordionDefs: Accordion[];
  };

  export default function (context: any, option: Option): Component;
}
