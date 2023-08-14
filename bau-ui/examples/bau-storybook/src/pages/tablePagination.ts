import tableContainer from "@grucloud/bau-ui/tableContainer";
import tablePagination, {
  type onPageChange,
} from "@grucloud/bau-ui/tablePagination";

import { Context } from "@grucloud/bau-ui/context";

const createRows = (maxItem = 1000) =>
  new Array(maxItem).fill("").map(() => ({
    name: "my name",
    email: "myemail@mail.col",
  }));

export default (context: Context) => {
  const { bau, css } = context;
  const { th, td, tr, table, thead, tbody } = bau.tags;

  const rows: any = createRows(45);

  const Row = ({ name, email }: any) => tr(td(name), td(email));

  const TableHeader = () =>
    thead(
      th(
        {
          class: css`
            text-align: left;
          `,
        },
        "Name"
      ),
      th(
        {
          class: css`
            text-align: left;
          `,
        },
        "Email"
      )
    );

  const TablePagination = tablePagination(context);
  const Table = tableContainer(context, {
    class: css`
      max-width: 650px;
    `,
  });

  const rowsState = bau.state(rows);

  const paginationState = bau.state({
    count: rows.length,
    totalCount: rows.length,
    page: 1,
    rowsPerPage: 10,
  });

  const rowsVisibleState = bau.derive(() =>
    rowsState.val.slice(
      paginationState.val.page * paginationState.val.rowsPerPage,
      (paginationState.val.page + 1) * paginationState.val.rowsPerPage
    )
  );

  const onPageChange: onPageChange =
    ({ page }) =>
    (_event) => {
      paginationState.val.page = page;
    };

  return () =>
    Table(
      table(TableHeader(), () => tbody(rowsVisibleState.val.map(Row))),
      () =>
        TablePagination({
          ...paginationState.val,
          onPageChange,
        })
    );
};
