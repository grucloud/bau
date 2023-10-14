import { Context } from "@grucloud/bau-ui/context";
import loadingButton from "@grucloud/bau-ui/loadingButton";

import form from "@grucloud/bau-ui/form";
import buttonBack from "../../components/buttonBack";
import page from "../../components/page";
import runCreateContent from "../../components/run/runCreateContent";

export default function (context: Context) {
  const { bau, stores, config, window } = context;
  const { h1, p, header, footer, div } = bau.tags;
  const ButtonBack = buttonBack(context);
  const LoadingButton = loadingButton(context, {
    color: "primary",
    variant: "solid",
  });
  const Page = page(context);
  const Form = form(context);
  const logViewEl = div();
  const RunCreateContent = runCreateContent(context);

  return function RunCreatePage({ org_id, project_id, workspace_id }: any) {
    const onsubmit = async (event: any) => {
      event.preventDefault();
      const { reason, kind } = event.target.elements;
      const { run_id, container_id } = await stores.run.createQuery.run(
        { org_id, project_id, workspace_id },
        {
          reason: reason.value,
          kind: kind.value,
          engine: config.engine,
        }
      );
      console.log("run_id", run_id, "container_id", container_id);
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
        window.history.pushState(
          "",
          "",
          `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}/runs/${run_id}`
        );
      });
      socket.addEventListener("error", (_event) => {
        console.log("websocket error");
      });
      socket.addEventListener("message", (event) => {
        console.log("Message from server ", event.data.toString());
        logViewEl.append(div(event.data.toString()));
      });
    };

    return Page(
      Form(
        { onsubmit },
        header(h1("Create a new Run")),
        p(),
        RunCreateContent({}),
        logViewEl,
        footer(
          LoadingButton(
            { type: "submit", loading: stores.run.createQuery.loading },
            "Create"
          ),
          ButtonBack()
        )
      )
    );
  };
}
