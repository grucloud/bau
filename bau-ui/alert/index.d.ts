declare module "@grucloud/bau-ui/alert" {
  export type AnimateProps = {
    severity:
      | "primary"
      | "secondary"
      | "danger"
      | "warning"
      | "info"
      | "success";
    onRemove?: Function;
  };

  type Component = import("../bau-ui").Component<AnimateProps>;

  export default function (context: Object): Component;
}
