import rubicox from "rubico/x";
const { isIn } = rubicox;
import { type Context } from "@grucloud/bau-ui/context";
import keyValueList from "@grucloud/bau-ui/keyValueList";

import tableSkeleton from "../tableSkeleton";
import runStatus from "./runStatus";
import { duration } from "../../utils/duration";

export default function (context: Context) {
  const { bau, css, config } = context;
  const { div, section, a, li, label, span } = bau.tags;
  const KeyValueList = keyValueList(context);

  const TableSkeleton = tableSkeleton(context);
  const RunStatus = runStatus(context);

  const isCompleted = isIn(["completed", "error"]);

  return function RunDetailContent({ data, loading }: any) {
    return section(() => {
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
        kind,
        created_at,
        updated_at,
      } = data.val;
      return loading.val
        ? TableSkeleton({ columnsSize: 2, rowSize: 8 })
        : div(
            {
              class: css`
                display: inline-flex;
                gap: 3rem;
              `,
            },
            KeyValueList(
              li(
                label("Organisation"),
                span(
                  a({ href: `${config.base}/org/${org_id}` }, data.val.org_id)
                )
              ),
              li(
                label("Project"),
                span(
                  a(
                    {
                      href: `${config.base}/org/${org_id}/projects/${project_id}`,
                    },
                    project_id
                  )
                )
              ),
              li(
                label("Workspace"),
                span(
                  a(
                    {
                      href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}`,
                    },
                    workspace_id
                  )
                )
              ),
              li(label("RunId"), span(run_id)),
              li(label("Kind"), span(kind))
            ),
            KeyValueList(
              li(label("Status"), span(RunStatus({ status, error }))),
              li(
                label("Created at"),
                span(
                  new Intl.DateTimeFormat("default", {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",

                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  }).format(new Date(created_at))
                )
              ),
              li(label("Duration"), span(duration(updated_at, created_at))),
              isCompleted(status) && [
                li(
                  label("State file"),
                  span(
                    a(
                      { href: stateUrl, target: "_blank" },
                      "Download state file"
                    )
                  )
                ),
                !error &&
                  li(
                    label("Live Graph"),
                    span(
                      a(
                        { href: svgUrl, target: "_blank" },
                        "Download resources graph"
                      )
                    )
                  ),
                li(
                  label("Logs"),
                  span(
                    a({ href: logsUrl, target: "_blank" }, "Download log file")
                  )
                ),
              ]
            )
          );
    });
  };
}
