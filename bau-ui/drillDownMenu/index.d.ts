declare module "@grucloud/bau-ui/drillDownMenu" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  type Tree = {
    data?: object;
    children?: Tree[];
  };

  export type TreeViewProps = {
    tree: Tree;
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<TreeViewProps>;

  type ComponentGeneric = import("../bau-ui").ComponentGeneric;

  type Option = {
    renderHeader?: ComponentGeneric;
    renderMenuItem?: ComponentGeneric;
    isActive?: (input: { subTree: object }) => boolean;
    base?: string;
  } & ComponentOption;

  export default function (context: Object, option: Option): Component;
}
