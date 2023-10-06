import { Context } from "@grucloud/bau-ui/context";
import loadingButton from "@grucloud/bau-ui/loadingButton";

import form from "@grucloud/bau-ui/form";
import buttonBack from "../../components/buttonBack";
import page from "../../components/page";
import runCreateContent from "../../components/run/runCreateContent";

export default function (context: Context) {
  const { bau, stores, config, window } = context;
  const { h1, p, header, footer } = bau.tags;
  const ButtonBack = buttonBack(context);
  const LoadingButton = loadingButton(context, {
    color: "primary",
    variant: "solid",
  });
  const Page = page(context);
  const Form = form(context);

  const RunCreateContent = runCreateContent(context);

  return function RunCreatePage({ org_id, project_id, workspace_id }: any) {
    const onsubmit = async (event: any) => {
      event.preventDefault();
      const { reason, kind } = event.target.elements;
      const { run_id } = await stores.run.createQuery.run(
        { org_id, project_id, workspace_id },
        {
          reason: reason.value,
          kind: kind.value,
          engine: config.engine,
        }
      );

      window.history.pushState(
        "",
        "",
        `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}/runs/${run_id}`
      );
    };

    return Page(
      Form(
        { onsubmit },
        header(h1("Create a new Run")),
        p(),
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
