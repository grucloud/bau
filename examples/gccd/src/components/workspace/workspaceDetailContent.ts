import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";

export default function (context: Context) {
  const { bau, css } = context;
  const { h2, table, tr, td, th, section } = bau.tags;
  const TableContainer = tableContainer(context, {
    class: css`
      & th {
        text-align: left;
      }
    `,
  });
  return function WorkspaceDetailContent({
    //org_id,
    workspace_id,
    workspace_name,
  }: any) {
    return section(
      h2("Summary"),
      TableContainer(
        table(
          tr(th("Workspace Name"), td(workspace_name)),
          tr(th("Workspace Id"), td(workspace_id))
        )
      )
    );
  };
}
