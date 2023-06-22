declare module "@grucloud/bau-ui/tabs" {
  export type TabsProps = {};

  type Component = import("../bau-ui").Component<TabsProps>;

  export default function (context: any, option: Object): Component;
}
