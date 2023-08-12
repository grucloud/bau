declare module "@grucloud/bau-ui/tableContainer" {
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type TableProps = {};

  type Component = import("../bau-ui").Component<TableProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
