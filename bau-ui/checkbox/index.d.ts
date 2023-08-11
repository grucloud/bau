declare module "@grucloud/bau-ui/checkbox" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;

  export type CheckboxProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<
    CheckboxProps,
    HTMLInputElement
  >;

  export default function (context: any): Component;
}
