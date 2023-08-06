declare module "@grucloud/bau-ui/slider" {
  export type SliderProps = {};

  type Component = import("../bau-ui").Component<SliderProps>;

  type Option = {
    class?: string;
  };

  export default function (context: any, option?: Option): Component;
}
