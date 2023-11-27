import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import modal from "@grucloud/bau-ui/modal";
import spinner from "@grucloud/bau-ui/spinner";

import logView from "../logView";

export default function (context: Context) {
  const { bau, config, css, window } = context;
  const { form, h1, header, footer, div, article } = bau.tags;
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
        let msg;
        try {
          msg = JSON.parse(event.data).data;
        } catch (error) {
          msg = event.data.toString();
        }
        console.log("Message from server ", msg);
        const divEl = div(msg);
        logViewEl.append(divEl);
        divEl.scrollIntoView({ block: "end" });
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
