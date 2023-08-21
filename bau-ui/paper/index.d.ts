declare module "@grucloud/bau-ui/paper" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type PaperProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<PaperProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
