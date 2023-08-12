declare module "@grucloud/bau-ui/slider" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type SliderProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<SliderProps, HTMLInputElement>;

  export default function (context: any, option?: ComponentOption): Component;
}
