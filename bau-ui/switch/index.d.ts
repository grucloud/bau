declare module "@grucloud/bau-ui/switch" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type SwitchProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<SwitchProps, HTMLInputElement>;

  export default function (context: any, option?: ComponentOption): Component;
}
