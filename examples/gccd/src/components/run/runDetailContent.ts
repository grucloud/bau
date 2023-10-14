import rubicox from "rubico/x";
const { isIn } = rubicox;
import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";
import runStatus from "./runStatus";

export default function (context: Context) {
  const { bau, css, config } = context;
  const { table, tr, td, th, section, a, img } = bau.tags;
  const RunStatus = runStatus(context);

  const TableContainer = tableContainer(context, {
    class: css`
      & th {
        text-align: left;
      }
    `,
  });

  const isCompleted = isIn(["completed", "error"]);

  return function RunDetailContent({
    org_id,
    workspace_id,
    project_id,
    run_id,
    container_id,
    status,
    stateUrl,
    logsUrl,
    svgUrl,
    engine,
    error,
  }: any) {
    console.log(
      "container_id",
      org_id,
      project_id,
      workspace_id,
      run_id,
      container_id,
      status,
      engine,
      error
    );
    return section(
      //h2("Summary"),
      TableContainer(
        table(
          tr(
            th("Organisation"),
            td(a({ href: `${config.base}/org/${org_id}` }, org_id))
          ),
          tr(
            th("Project"),
            td(
              a(
                { href: `${config.base}/org/${org_id}/projects/${project_id}` },
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
              td(a({ href: stateUrl, target: "_blank" }, "Download state file"))
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
              td(a({ href: logsUrl, target: "_blank" }, "Download log file"))
            ),
          ]
        ),
        isCompleted(status) &&
          !error &&
          img({
            src: svgUrl,
            alt: "Resources",
          })
      )
    );
  };
}
