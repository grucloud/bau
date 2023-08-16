declare module "@grucloud/bau-ui/checkbox" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type CheckboxProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<
    CheckboxProps,
    HTMLInputElement
  >;

  export default function (context: any, option?: ComponentOption): Component;
}
