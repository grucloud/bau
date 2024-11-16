import tablePagination from "./tablePagination";
import tablePaginationAsync from "../tablePaginationAsync";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div, h3, h2, tr } = bau.tags;

  const TablePagination = tablePagination(context);
  const TablePaginationAsync = tablePaginationAsync(context);

  const Container = (...children: any[]) =>
    div(
      {
        class: css`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
          & .table-container {
            width: 100%;
            & table {
              min-width: 500px;
              width: 100%;
              & td,
              th {
                padding: 0.4rem;
              }
            }
          }
        `,
      },
      children
    );

  return () => {
    return section(
      { id: "pagination" },
      h2(tr("Table Pagination")),
      h3("Asynchronous Pagination"),
      Container(TablePaginationAsync()),
      h3("Simple Pagination"),
      Container(TablePagination())
    );
  };
};
