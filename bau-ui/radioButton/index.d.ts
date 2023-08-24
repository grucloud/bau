declare module "@grucloud/bau-ui/radioButton" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type RadioButtonProps = {
    value: string | import("@grucloud/bau").State<string>;
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<
    RadioButtonProps,
    HTMLInputElement
  >;

  export default function (context: any, option?: ComponentOption): Component;
}
