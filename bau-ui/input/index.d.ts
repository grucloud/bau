declare module "@grucloud/bau-ui/input" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;

  export type InputProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<InputProps, HTMLInputElement>;

  export default function (context: any): Component;
}
