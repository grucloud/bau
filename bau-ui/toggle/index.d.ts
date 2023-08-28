declare module "@grucloud/bau-ui/toggle" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type ToggleProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<ToggleProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
