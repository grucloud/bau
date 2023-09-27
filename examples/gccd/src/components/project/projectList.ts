import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";

export default function (context: Context) {
  const { bau, css, config } = context;
  const { span, a, table, thead, tbody, th, tr, td, section } = bau.tags;
  const TableContainer = tableContainer(context, {
    class: css`
      & th {
        text-align: left;
      }
    `,
  });

  const ListItem = ({
    org_id,
    org_name,
    project_id,
    project_name,
    workspace_count,
  }: any) =>
    tr(
      {
        "data-project-list-item-name": project_id,
      },
      td(a({ href: `${config.base}/org/${org_id}` }, org_name)),

      td(
        a(
          {
            href: `${config.base}/org/${org_id}/projects/${project_id}`,
            class: css`
              color: var(--font-color);
            `,
          },
          span(project_name)
        )
      ),
      td(workspace_count)
    );

  return function ProjectList(projects: any) {
    return section(
      TableContainer(
        table(
          thead(th("Organisation"), th("Projects"), th("Workspaces")),
          tbody(projects.map(ListItem))
        )
      )
    );
  };
}
