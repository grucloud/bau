declare module "@grucloud/bau-ui/spinner" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type SpinnerProps = {
    visibility?: boolean;
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<SpinnerProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
