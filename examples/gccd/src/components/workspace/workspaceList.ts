import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";

export default function (context: Context) {
  const { bau, css } = context;
  const { span, a, table, tr, td, section } = bau.tags;
  const TableContainer = tableContainer(context, {
    class: css`
      & th {
        text-align: left;
      }
    `,
  });

  const ListItem = ({ project_id, workspace_id, workspace_name }: any) =>
    tr(
      {
        "data-workspace-list-item-name": workspace_id,
      },
      td(
        a(
          {
            href: `${project_id}/workspaces/${workspace_id}`,
            class: css`
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 1rem;
              color: var(--font-color);
            `,
          },
          span(workspace_name)
        )
      )
    );

  return function WorkspaceList(workspaces: any) {
    return section(TableContainer(table(workspaces.map(ListItem))));
  };
}
