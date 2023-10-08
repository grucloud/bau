import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";

import runStatus from "./runStatus";

export default function (context: Context) {
  const { bau, css, config } = context;
  const { a, table, thead, tbody, th, tr, td, section } = bau.tags;
  const RunStatus = runStatus(context);
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
    error,
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
      td(RunStatus({ status, error }))
    );

  const headers = ["Organisation", "Projects", "Workspaces", "Run", "Status"];

  return function RunList(runs: any) {
    return section(
      TableContainer(
        table(
          thead(headers.map((header) => th({ scope: "col" }, header))),
          tbody(runs.map(ListItem))
        )
      )
    );
  };
}
