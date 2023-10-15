import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";
import tableSkeleton from "../tableSkeleton";

export default function (context: Context) {
  const { bau, css, config } = context;
  const { span, a, table, thead, tbody, th, tr, td, section } = bau.tags;

  const TableSkeleton = tableSkeleton(context);
  const TableContainer = tableContainer(context, {
    class: css`
      & th {
        text-align: left;
      }
    `,
  });

  const ListItem = ({ org_id, project_id, workspace_count }: any) =>
    tr(
      {
        "data-project-list-item-name": project_id,
      },
      td(a({ href: `${config.base}/org/${org_id}` }, org_id)),

      td(
        a(
          {
            href: `${config.base}/org/${org_id}/projects/${project_id}`,
            class: css`
              color: var(--font-color);
            `,
          },
          span(project_id)
        )
      ),
      td(workspace_count)
    );

  const headers = ["Organisation", "Projects", "Workspaces"];

  return function ProjectList({ data, loading }: any) {
    return section(
      TableContainer(
        table(
          thead(headers.map((header) => th({ scope: "col" }, header))),
          () =>
            loading.val
              ? TableSkeleton({ columnsSize: 3 })
              : tbody(data.val.map(ListItem))
        )
      )
    );
  };
}
