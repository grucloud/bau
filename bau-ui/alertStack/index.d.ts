declare module "@grucloud/bau-ui/alertStack" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type AlertStackProps = {} & DefaultDesignProps;

  type AlertStack = import("../bau-ui").Component<AlertStackProps>;

  export default function (
    context: any,
    options: { limit?: Number; deleteAfterDuration?: Number } & ComponentOption
  ): AlertStack;
}
