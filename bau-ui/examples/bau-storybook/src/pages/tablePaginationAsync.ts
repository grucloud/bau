import tableContainer from "@grucloud/bau-ui/tableContainer";
import tablePagination, {
  type onPageChange,
} from "@grucloud/bau-ui/tablePagination";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { th, td, tr, table, thead, tbody, div } = bau.tags;

  const isLoading = bau.state(false);
  const rowsState = bau.state([]);
  const errorState = bau.state("");
  const countState = bau.derive(() => rowsState.val.length);
  const pageState = bau.state(1);
  const rowsPerPageState = bau.state(10);

  const rowsVisibleState = bau.derive(() => {
    //console.log("rowsVisibleState", rowsState.val);
    return rowsState.val;
  });

  const buildUrl = (paramsObj: any) => {
    const searchParams = new URLSearchParams(paramsObj);
    return `https://api.github.com/orgs/aws/repos?${searchParams.toString()}`;
  };

  const onPageChange: onPageChange =
    ({ page }) =>
    (_event) => {
      pageState.val = page;
      fetchJSON(buildUrl({ page, per_page: rowsPerPageState.val }));
    };

  fetchJSON(buildUrl({ page: 1, per_page: rowsPerPageState.val }));

  async function fetchJSON(request: any) {
    try {
      isLoading.val = true;
      const response = await fetch(request, {});
      if (response.ok) {
        const jsonData = await response.json();
        // console.log("fetchJSON", jsonData);
        rowsState.val = jsonData;
        return;
      }
      throw response;
    } catch (error: any) {
      errorState.val = error.message;
    } finally {
      isLoading.val = false;
    }
  }

  const Row = ({ name, description, stargazers_count }: any) =>
    tr(
      td(name),
      td(description),
      td(
        {
          class: css`
            text-align: right;
          `,
        },
        stargazers_count
      )
    );

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
        "Description"
      ),
      th(
        {
          class: css`
            text-align: right;
          `,
        },
        "Stars"
      )
    );

  const TablePagination = tablePagination(context);
  const Table = tableContainer(context, {
    class: css`
      min-width: 650px;
    `,
  });

  const ErrorMessage = ({ message }: any) => div(message);

  return () =>
    Table(
      () =>
        TablePagination({
          rowsPerPage: rowsPerPageState.val,
          page: pageState.val,
          count: countState.val,
          totalCount: -1,
          isLoading: isLoading.val,
          onPageChange,
          disableNext: () => false,
        }),
      table(
        TableHeader(),
        () => errorState.val && ErrorMessage({ message: errorState.val }),
        () => tbody(rowsVisibleState.val.map(Row))
      )
    );
};
