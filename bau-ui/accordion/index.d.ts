declare module "@grucloud/bau-ui/accordion" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

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

  export default function (context: any, option?: ComponentOption): Component;
}
