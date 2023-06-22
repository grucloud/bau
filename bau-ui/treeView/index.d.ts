declare module "@grucloud/bau-ui/treeView" {
  export type TreeViewProps = {};

  type Component = import("../bau-ui").Component<TreeViewProps>;

  export default function (context: Object, option: Object): Component;
}
