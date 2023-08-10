declare module "@grucloud/bau-ui/tableContainer" {
  export type TableProps = {};

  type Component = import("../bau-ui").Component<TableProps>;

  type Option = {
    class?: string;
  };

  export default function (context: any, option?: Option): Component;
}
