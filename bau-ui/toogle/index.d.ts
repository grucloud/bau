declare module "@grucloud/bau-ui/toogle" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type ToogleProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<ToogleProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
