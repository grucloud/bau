declare module "@grucloud/bau-ui/alertStack" {
  export type AlertStackProps = {};

  type AlertStack = import("../bau-ui").Component<AlertStackProps>;

  export default function (
    context: any,
    options: { limit?: Number; deleteAfterDuration?: Number }
  ): AlertStack;
}
