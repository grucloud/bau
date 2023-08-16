declare module "@grucloud/bau-ui/tooltip" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type TooltipProps = {
    side?:
      | "top-start"
      | "top-centered"
      | "top-end"
      | "bottom-start"
      | "bottom-centered"
      | "bottom-end"
      | "right-start"
      | "right-centered"
      | "right-end"
      | "left-start"
      | "left-centered"
      | "left-end";
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<TooltipProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
