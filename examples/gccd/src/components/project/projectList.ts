import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";

export default function (context: Context) {
  const { bau, css, config } = context;
  const { span, a, table, tr, td, section } = bau.tags;
  const TableContainer = tableContainer(context, {
    class: css`
      & th {
        text-align: left;
      }
    `,
  });

  const ListItem = ({ org_id, org_name, project_id, project_name }: any) =>
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
      )
    );

  return function ProjectList(projects: any) {
    return section(TableContainer(table(projects.map(ListItem))));
  };
}
