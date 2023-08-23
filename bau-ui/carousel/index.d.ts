declare module "@grucloud/bau-ui/carousel" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  type Slide = {
    src: string;
  };

  type CommandProp = {};
  type ComponentGeneric = import("../bau-ui").ComponentWithProp<CommandProp>;

  export type CarouselProps = {
    slides: object[];
    Slide: ComponentGeneric;
    Previous: ComponentGeneric;
    Next: ComponentGeneric;
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<CarouselProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
