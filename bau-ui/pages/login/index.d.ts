declare module "@grucloud/bau-ui/pages/login" {
  type ComponentOption = import("../../bau-ui").ComponentOption;

  export type LoginProps = {};

  type Component = import("../../bau-ui").Component<LoginProps>;

  export default function (context: any): Component;
}
