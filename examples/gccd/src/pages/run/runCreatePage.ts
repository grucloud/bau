import { Context } from "@grucloud/bau-ui/context";
import loadingButton from "@grucloud/bau-ui/loadingButton";

import form from "@grucloud/bau-ui/form";
import buttonBack from "../../components/buttonBack";
import page from "../../components/page";
import runCreateContent from "../../components/run/runCreateContent";
import runLogsModal from "../../components/run/runLogsModal";

export default function (context: Context) {
  const { bau, stores, config } = context;
  const { h1, header, footer } = bau.tags;
  const ButtonBack = buttonBack(context);
  const LoadingButton = loadingButton(context, {
    color: "primary",
    variant: "solid",
  });
  const Page = page(context);
  const Form = form(context);
  const RunCreateContent = runCreateContent(context);
  const RunLogsModal = runLogsModal(context);

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
      const search = new URLSearchParams(window.location.search);
      search.set("run_id", run_id);
      if (container_id) {
        search.set("container_id", container_id);
      }

      window.history.pushState("", "", `?${search}`);
      const modelEl = RunLogsModal({
        org_id,
        project_id,
        workspace_id,
        run_id,
        container_id,
      });
      event.target.closest("form").append(modelEl);
      modelEl.showModal();
    };

    return Page(
      Form(
        { onsubmit },
        header(h1("Create a new Run")),
        RunCreateContent({}),
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
