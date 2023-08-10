declare module "@grucloud/bau-ui/tablePagination" {
  export type onPageChange = ({ page: Number }) => (event: Event) => void;

  export type TablePaginationProps = {
    count: number;
    page: number;
    rowsPerPage: number;
    isLoading?: boolean;
    onPageChange: onPageChange;
  };

  type Component = import("../bau-ui").Component<TablePaginationProps>;

  type Option = {
    class?: string;
  };

  export default function (context: any, option?: Option): Component;
}
