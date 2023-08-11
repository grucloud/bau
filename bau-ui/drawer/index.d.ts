declare module "@grucloud/bau-ui/drawer" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;

  export type DrawerProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<DrawerProps>;

  export default function (context: any): Component;
}
