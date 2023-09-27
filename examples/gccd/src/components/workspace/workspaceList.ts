import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";

export default function (context: Context) {
  const { bau, css, config } = context;
  const { span, a, table, tbody, thead, tr, th, td, section } = bau.tags;
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

  return function WorkspaceList(workspaces: any) {
    return section(
      TableContainer(
        table(
          thead(th("Org"), th("Project"), th("Workspace")),
          tbody(workspaces.map(ListItem))
        )
      )
    );
  };
}
