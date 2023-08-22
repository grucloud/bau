declare module "@grucloud/bau-ui/tableOfContent" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type TableOfContentProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<TableOfContentProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
