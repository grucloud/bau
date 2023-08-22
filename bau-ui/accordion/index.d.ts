declare module "@grucloud/bau-ui/accordion" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;

  export type AccordionProps = {
    data: Accordion[];
  } & DefaultDesignProps;

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
  };

  export default function (context: any, option?: Option): Component;
}
