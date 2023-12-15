declare module "@grucloud/bau-ui/collapsible" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type CollapsibleProps = { expanded?: boolean } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<CollapsibleProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
