declare module "@grucloud/bau-ui/list" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type ListProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<ListProps, HTMLUListElement>;

  export default function (context: any, option?: ComponentOption): Component;
}
