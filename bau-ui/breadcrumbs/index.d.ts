declare module "@grucloud/bau-ui/breadcrumbs" {
  export type BreadcrumbsProps = {
    separator?: string;
    //TODO
    items: any[];
  };

  type Component = import("../bau-ui").Component<BreadcrumbsProps>;

  type ComponentGeneric = import("../bau-ui").ComponentGeneric;

  export default function (context: Object): Component;
}
