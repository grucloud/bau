declare module "@grucloud/bau-ui/badge" {
  export type BadgeProps = {
    content: string;
    primary?: boolean;
    secondary?: boolean;
    success?: boolean;
    danger?: boolean;
  };

  type Component = import("../bau-ui").Component<BadgeProps>;

  type Option = {
    class?: string;
  };

  export default function (context: any, option?: Option): Component;
}
