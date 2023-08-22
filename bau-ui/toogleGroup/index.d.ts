declare module "@grucloud/bau-ui/toogleGroup" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type ToogleGroupProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<ToogleGroupProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
