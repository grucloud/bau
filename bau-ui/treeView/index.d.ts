declare module "@grucloud/bau-ui/treeView" {
  type Tree = {
    data?: object;
    children?: Tree[];
    expanded?: boolean;
  };
  export type TreeViewProps = {
    tree: Tree;
  };

  type Component = import("../bau-ui").Component<TreeViewProps>;

  type ComponentGeneric = import("../bau-ui").ComponentGeneric;

  type Option = {
    renderMenuItem: ComponentGeneric;
  };
  export default function (context: Object, option: Option): Component;
}
