declare module "@grucloud/bau-ui/carousel" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type CarouselProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<CarouselProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
