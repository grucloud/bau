import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import modal from "@grucloud/bau-ui/modal";
import spinner from "@grucloud/bau-ui/spinner";

import logView from "../logView";

function keepAlive(webSocket: any) {
  var timeout = 20000;
  if (webSocket.readyState == webSocket.OPEN) {
    webSocket.send("{}");
  }
  setTimeout(() => keepAlive(webSocket), timeout);
}

export default function (context: Context) {
  const { bau, config, css, window } = context;
  const { form, h1, header, footer, pre, article } = bau.tags;
  const Button = button(context, { color: "neutral" });
  const Modal = modal(context, { size: "lg" });
  const Spinner = spinner(context, { size: "lg" });

  const className = css`
    > form {
      gap: 0.5rem;
    }
  `;
  const logViewEl = logView(context)();

  return function RunLogsModal({
    org_id,
    project_id,
    workspace_id,
    run_id,
    container_id,
  }: any) {
    console.assert(org_id);
    console.assert(project_id);
    console.assert(workspace_id);
    const runningState = bau.state(true);

    const connectWebSocket = async () => {
      const socket = new WebSocket(config.wsUrl(window));
      // Connection opened
      socket.addEventListener("open", (_event) => {
        console.log("ws open");

        keepAlive(socket);

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
              engine: config.engine,
            },
          })
        );
      });
      socket.addEventListener("close", (event) => {
        console.log("websocket closed", event);
        runningState.val = false;
      });
      socket.addEventListener("error", (_event) => {
        console.log("websocket error");
        //TODO
        runningState.val = false;
      });
      socket.addEventListener("message", (event) => {
        console.log("Message from server ", event.data);

        try {
          const msg = JSON.parse(event.data);
          switch (msg.command) {
            case "logs":
              {
                const linesEl = msg.data
                  .split("\n")
                  .filter((line: string) => line)
                  .map((line: string) => pre(line));
                logViewEl.append(...linesEl);
                linesEl[0].scrollIntoView({ block: "end" });
              }
              break;
            case "end":
              socket.close();
              break;
            default:
              break;
          }

          //console.log("Message from server ", msg);
        } catch (error) {
          //console.error("Message from server ");
        }
      });
    };

    connectWebSocket();

    return Modal(
      { id: "run-dialog", class: className },
      form(
        header(h1("Run"), Spinner({ visibility: runningState })),
        article(logViewEl),
        footer(
          Button(
            {
              variant: "solid",
              onclick: (event: any) => {
                event.target.closest("dialog").close();
                window.history.pushState(
                  "",
                  "",
                  `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}/runs/${run_id}`
                );
              },
            },
            "Close"
          )
        )
      )
    );
  };
}
