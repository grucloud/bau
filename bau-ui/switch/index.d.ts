declare module "@grucloud/bau-ui/switch" {
  export type SwitchProps = {};

  type Component = import("../bau-ui").Component<SwitchProps, HTMLInputElement>;

  export default function (context: any): Component;
}
