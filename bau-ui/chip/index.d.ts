declare module "@grucloud/bau-ui/chip" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type ChipProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<ChipProps, HTMLSpanElement>;

  export default function (context: any, option?: ComponentOption): Component;
}
