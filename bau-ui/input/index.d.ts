declare module "@grucloud/bau-ui/input" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  // Bau component size (sm, md and lg) conflicts with the native html input size.
  export type InputProps = { size?: Number } & Omit<DefaultDesignProps, "size">;

  type Component = import("../bau-ui").Component<InputProps, HTMLInputElement>;

  export default function (context: any, option?: ComponentOption): Component;
}
