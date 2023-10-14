declare module "@grucloud/bau-ui/skeleton" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type SkeletonProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<SkeletonProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
