declare module "@grucloud/bau-ui/popover" {
  export type PopoverProps = {};

  type Component = import("../bau-ui").Component<PopoverProps>;

  type Option = {
    class?: string;
  };

  export default function (context: any, option?: Option): Component;
}
