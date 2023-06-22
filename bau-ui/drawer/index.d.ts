declare module "@grucloud/bau-ui/drawer" {
  export type DrawerProps = {};

  type Component = import("../bau-ui").Component<DrawerProps>;

  export default function (context: any): Component;
}
