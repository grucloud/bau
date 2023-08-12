declare module "@grucloud/bau-ui/buttonGroup" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type ButtonGroupProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<ButtonGroupProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
