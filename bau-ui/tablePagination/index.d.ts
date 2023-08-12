declare module "@grucloud/bau-ui/tablePagination" {
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type onPageChange = ({ page: Number }) => (event: Event) => void;

  export type TablePaginationProps = {
    count: number;
    page: number;
    rowsPerPage: number;
    isLoading?: boolean;
    onPageChange: onPageChange;
  };

  type Component = import("../bau-ui").Component<TablePaginationProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
