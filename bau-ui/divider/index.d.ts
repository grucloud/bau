declare module "@grucloud/bau-ui/divider" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type DividerProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<DividerProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
