import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";

export default function (context: Context) {
  const { bau, css, config } = context;
  const { h2, table, tr, td, th, section, a } = bau.tags;
  const TableContainer = tableContainer(context, {
    class: css`
      & th {
        text-align: left;
      }
    `,
  });
  return function RunDetailContent({
    org_id,
    workspace_id,
    project_id,
    run_id,
    container_id,
    status,
    logsUrl,
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
    if (status == "creating" && container_id) {
      // TODO window.location.host ?
      const socket = new WebSocket("ws://localhost:9000");
      // Connection opened
      socket.addEventListener("open", (_event) => {
        console.log("open");
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
              engine,
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
          tr(
            th("Logs"),
            td(a({ href: logsUrl, target: "_blank" }, "Download log file"))
          )
        )
      )
    );
  };
}
