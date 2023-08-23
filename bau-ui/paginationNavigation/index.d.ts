declare module "@grucloud/bau-ui/paginationNavigation" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type PaginationNavigationProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<PaginationNavigationProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
