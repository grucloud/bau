declare module "@grucloud/bau-ui/chip" {
  export type ChipProps = {
    primary?: boolean;
    secondary?: boolean;
    success?: boolean;
    danger?: boolean;
  };

  type Component = import("../bau-ui").Component<ChipProps>;

  type Option = {
    class?: string;
  };

  export default function (context: any, option?: Option): Component;
}
