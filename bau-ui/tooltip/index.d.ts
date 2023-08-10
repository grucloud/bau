declare module "@grucloud/bau-ui/tooltip" {
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
  };

  type Component = import("../bau-ui").Component<TooltipProps>;

  type Option = {
    class?: string;
  };

  export default function (context: any, option?: Option): Component;
}
