declare module "@grucloud/bau-ui/linearProgress" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type LinearProgressProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<LinearProgressProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
