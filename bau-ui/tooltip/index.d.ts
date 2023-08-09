declare module "@grucloud/bau-ui/tooltip" {
  export type TooltipProps = {};

  type Component = import("../bau-ui").Component<TooltipProps>;

  type Option = {
    class?: string;
  };

  export default function (context: any, option?: Option): Component;
}
