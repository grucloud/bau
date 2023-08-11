declare module "@grucloud/bau-ui/slider" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;

  export type SliderProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<SliderProps, HTMLInputElement>;

  type Option = {
    class?: string;
  };

  export default function (context: any, option?: Option): Component;
}
