declare module "@grucloud/bau-ui/switch" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;

  export type SwitchProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<SwitchProps, HTMLInputElement>;

  export default function (context: any): Component;
}
