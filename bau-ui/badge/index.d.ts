declare module "@grucloud/bau-ui/badge" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type BadgeProps = {
    content: string;
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<BadgeProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
