declare module "@grucloud/bau-ui/inputSearch" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  // Bau component size (sm, md and lg) conflicts with the native html inputSearch size.
  export type InputSearchProps = { size?: Number } & Omit<
    DefaultDesignProps,
    "size"
  >;

  type Component = import("../bau-ui").Component<
    InputSearchProps,
    HTMLInputElement
  >;

  export default function (context: any, option?: ComponentOption): Component;
}
