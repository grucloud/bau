declare module "@grucloud/bau-ui/treeView" {
  export type TreeViewProps = {
    tree: { children: object[] };
  };

  type Component = import("../bau-ui").Component<TreeViewProps>;
  //TODO option
  export default function (context: Object, option: Object): Component;
}
