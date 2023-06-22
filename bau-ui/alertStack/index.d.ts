declare module "@grucloud/bau-ui/alertStack" {
  export type AlertStackProps = {};

  type AlertComponent = import("../bau-ui").Component<AlertStackProps>;
  type ComponentGeneric = import("../bau-ui").ComponentGeneric;

  export type AlertStack = {
    add: (input: { component: ComponentGeneric }) => undefined;
    remove: (input: { id: string }) => undefined;
  } & AlertComponent;

  type Options = { limit?: Number; deleteAfterDuration?: Number };

  export default function (context: any, options: Options): AlertStack;
}
