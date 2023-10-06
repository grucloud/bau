import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";

export default function (context: Context) {
  const { bau, css, config, window } = context;
  const { h2, table, tr, td, th, section, a, img } = bau.tags;
  const TableContainer = tableContainer(context, {
    class: css`
      & th {
        text-align: left;
      }
    `,
  });

  const isCreating = (status: string) => status == "creating";

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
  }: any) {
    console.log(
      "container_id",
      org_id,
      project_id,
      workspace_id,
      run_id,
      container_id,
      status,
      engine
    );
    if (isCreating(status) && container_id) {
      const socket = new WebSocket(config.wsUrl(window));
      // Connection opened
      socket.addEventListener("open", (_event) => {
        console.log("ws open");
        socket.send(
          JSON.stringify({
            origin: "browser",
            command: "join",
            options: {
              room: `${org_id}/${project_id}/${workspace_id}/${run_id}`,
            },
          })
        );
        socket.send(
          JSON.stringify({
            command: "Run",
            options: {
              org_id,
              project_id,
              workspace_id,
              run_id,
              container_id,
              engine: "docker",
            },
          })
        );
      });
      socket.addEventListener("close", (event) => {
        console.log("websocket closed", event);
      });
      socket.addEventListener("error", (_event) => {
        console.log("websocket error");
      });
      socket.addEventListener("message", (event) => {
        console.log("Message from server ", event.data.toString());
      });
    }
    return section(
      h2("Summary"),
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
          tr(th("Status"), td(status)),
          !isCreating(status) && [
            tr(
              th("State file"),
              td(a({ href: stateUrl, target: "_blank" }, "Download state file"))
            ),
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
        !isCreating(status) &&
          img({
            src: svgUrl,
            alt: "Resources",
          })
      )
    );
  };
}
