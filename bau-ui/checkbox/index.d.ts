declare module "@grucloud/bau-ui/checkbox" {
  export type CheckboxProps = {};

  type Component = import("../bau-ui").Component<
    CheckboxProps,
    HTMLInputElement
  >;

  export default function (context: any): Component;
}
