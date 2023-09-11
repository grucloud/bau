declare module "@grucloud/bau-ui/selectNative" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type SelectNativeProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<
    SelectNativeProps,
    HTMLSelectElement
  >;

  export default function (context: any, option?: ComponentOption): Component;
}
