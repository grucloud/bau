import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";
import tableSkeleton from "../tableSkeleton";

export default function (context: Context) {
  const { bau, css, config } = context;
  const { span, a, table, tbody, thead, tr, th, td, section } = bau.tags;
  const TableSkeleton = tableSkeleton(context);

  const TableContainer = tableContainer(context, {
    class: css`
      & th {
        text-align: left;
      }
    `,
  });

  const ListItem = ({ project_id, workspace_id, org_id }: any) =>
    tr(
      {
        "data-workspace-list-item-name": workspace_id,
      },
      td(a({ href: `${config.base}/org/${org_id}` }, org_id)),
      td(
        a(
          { href: `${config.base}/org/${org_id}/projects/${project_id}` },
          project_id
        )
      ),
      td(
        a(
          {
            href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}`,
            class: css`
              color: var(--font-color);
            `,
          },
          span(workspace_id)
        )
      )
    );

  const headers = ["Organisation", "Projects", "Workspaces"];

  return function WorkspaceList({ data, loading }: any) {
    return section(
      TableContainer(
        table(
          thead(headers.map((header) => th({ scope: "col" }, header))),
          () =>
            loading.val
              ? TableSkeleton({ columnsSize: 3, rowSize: 3 })
              : tbody(data.val.map(ListItem))
        )
      )
    );
  };
}
