declare module "@grucloud/bau-ui/breadcrumbs" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type BreadcrumbsProps = {
    separator?: string;
    //TODO
    items: any[];
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<BreadcrumbsProps>;

  type ComponentGeneric = import("../bau-ui").ComponentGeneric;

  export default function (
    context: Object,
    options?: ComponentOption
  ): Component;
}
