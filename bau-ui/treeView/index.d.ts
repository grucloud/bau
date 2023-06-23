declare module "@grucloud/bau-ui/treeView" {
  export type TreeViewProps = {
    tree: { children: object[] };
  };

  type Component = import("../bau-ui").Component<TreeViewProps>;

  type ComponentGeneric = import("../bau-ui").ComponentGeneric;

  type Option = {
    renderMenuItem: ComponentGeneric;
  };
  export default function (context: Object, option: Option): Component;
}
