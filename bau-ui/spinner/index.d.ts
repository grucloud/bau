declare module "@grucloud/bau-ui/spinner" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;

  export type SpinnerProps = {
    //size?: Number;
    //color?: "primary" | "secondary" | "warning" | "danger" | "info" | "success";
    visibility?: boolean;
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<SpinnerProps>;

  export default function (context: any): Component;
}
