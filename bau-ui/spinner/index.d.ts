declare module "@grucloud/bau-ui/spinner" {
  export type SpinnerProps = {
    size?: Number;
    color?: "primary" | "secondary" | "warning" | "danger" | "info" | "success";
    visibility?: boolean;
  };

  type Component = import("../bau-ui").Component<SpinnerProps>;

  export default function (context: any): Component;
}
