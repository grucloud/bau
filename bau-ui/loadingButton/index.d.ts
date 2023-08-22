declare module "@grucloud/bau-ui/loadingButton" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type LoadingButtonProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<LoadingButtonProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
