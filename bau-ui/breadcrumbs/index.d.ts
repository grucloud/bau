declare module "@grucloud/bau-ui/breadcrumbs" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type BreadcrumbsProps = {
    //TODO
    items: any[];
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<BreadcrumbsProps>;

  type ComponentGeneric = import("../bau-ui").ComponentGeneric;

  const BreadcrumbsOptions = { separator: string } & ComponentOption;

  export default function (
    context: Object,
    options?: BreadcrumbsOptions
  ): Component;
}
