import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";
import chip from "@grucloud/bau-ui/chip";

const statusToColor = (status: string) => {
  switch (status) {
    case "completed":
      return "success";
    default:
      return "warning";
  }
};
export default function (context: Context) {
  const { bau, css, config } = context;
  const { a, table, thead, tbody, th, tr, td, section } = bau.tags;
  const Chip = chip(context, { size: "sm", variant: "solid" });
  const TableContainer = tableContainer(context, {
    class: css`
      & th {
        text-align: left;
      }
    `,
  });

  const ListItem = ({
    org_id,
    project_id,
    workspace_id,
    run_id,
    status,
  }: any) =>
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
          },
          workspace_id
        )
      ),
      td(
        a(
          {
            href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}/runs/${run_id}`,
          },
          run_id
        )
      ),
      td(Chip({ color: statusToColor(status) }, status))
    );

  return function RunList(runs: any) {
    return section(
      TableContainer(
        table(
          thead(
            th("Organisation"),
            th("Projects"),
            th("Workspaces"),
            th("Run"),
            th("Status")
          ),
          tbody(runs.map(ListItem))
        )
      )
    );
  };
}
