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

  const ListItem = ({ org_id, project_id, workspace_id, run_id }: any) =>
    tr(
      {
        "data-run-list-item-name": run_id,
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
      ),
      td(
        a(
          {
            href: `${workspace_id}/runs/${run_id}`,
            class: css`
              color: var(--font-color);
            `,
          },
          span(run_id)
        )
      )
    );

  return function RunList(runs: any) {
    return section(TableContainer(table(runs.map(ListItem))));
  };
}
