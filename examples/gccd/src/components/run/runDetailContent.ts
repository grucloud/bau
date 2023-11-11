import rubicox from "rubico/x";
const { isIn } = rubicox;
import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";

import tableSkeleton from "../tableSkeleton";
import runStatus from "./runStatus";

export default function (context: Context) {
  const { bau, css, config } = context;
  const { table, tr, td, th, section, a, img, tbody } = bau.tags;

  const TableSkeleton = tableSkeleton(context);
  const RunStatus = runStatus(context);
  const TableContainer = tableContainer(context, {
    class: css`
      & th {
        text-align: left;
      }
    `,
  });

  const isCompleted = isIn(["completed", "error"]);

  return function RunDetailContent({ data, loading }: any) {
    return section(
      TableContainer(
        table(() => {
          const {
            org_id,
            workspace_id,
            project_id,
            run_id,
            status,
            stateUrl,
            logsUrl,
            svgUrl,
            error,
          } = data.val;
          return loading.val
            ? TableSkeleton({ columnsSize: 2, rowSize: 8 })
            : tbody(
                tr(
                  th("Organisation"),
                  td(
                    a({ href: `${config.base}/org/${org_id}` }, data.val.org_id)
                  )
                ),
                tr(
                  th("Project"),
                  td(
                    a(
                      {
                        href: `${config.base}/org/${org_id}/projects/${project_id}`,
                      },
                      project_id
                    )
                  )
                ),
                tr(
                  th("Workspace"),
                  td(
                    a(
                      {
                        href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}`,
                      },
                      workspace_id
                    )
                  )
                ),
                tr(th("Run Id"), td(run_id)),
                tr(th("Status"), td(RunStatus({ status, error }))),
                isCompleted(status) && [
                  tr(
                    th("State file"),
                    td(
                      a(
                        { href: stateUrl, target: "_blank" },
                        "Download state file"
                      )
                    )
                  ),
                  !error &&
                    tr(
                      th("Live Graph"),
                      td(
                        a(
                          { href: svgUrl, target: "_blank" },
                          "Download resources graph"
                        )
                      )
                    ),
                  tr(
                    th("Logs"),
                    td(
                      a(
                        { href: logsUrl, target: "_blank" },
                        "Download log file"
                      )
                    )
                  ),
                ]
              );
        }),

        () =>
          isCompleted(data.val.status) &&
          !data.val.error &&
          img({
            src: data.val.svgUrl,
            alt: "Resources",
          })
      )
    );
  };
}
