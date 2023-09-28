import { Context } from "@grucloud/bau-ui/context";
import paper from "@grucloud/bau-ui/paper";
import buttonBack from "../../components/buttonBack";
import loadingButton from "@grucloud/bau-ui/loadingButton";
import formDestroy from "../../components/formDestroy";
import inputDelete from "../../components/inputDelete";

export default function (context: Context) {
  const { bau, stores, window, config } = context;
  const { h1, header, span, section, footer } = bau.tags;

  const FormDestroy = formDestroy(context);
  const Paper = paper(context);
  const ButtonBack = buttonBack(context);
  const LoadingButton = loadingButton(context, {
    variant: "solid",
    color: "danger",
  });
  const InputDelete = inputDelete(context);

  return function ProjectDestroyPage({
    org_id,
    project_id,
    workspace_id,
    run_id,
  }: any) {
    const { deleteQuery } = stores.workspace;

    const onsubmit = async (event: any) => {
      event.preventDefault();
      await deleteQuery.run({ org_id, project_id, workspace_id, run_id });
      window.history.pushState(
        "",
        "",
        `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}`
      );
    };

    return Paper(
      FormDestroy(
        { onsubmit },
        header(h1("Remove Run")),
        section(span("Remove the run from the workspace"), InputDelete()),
        footer(
          ButtonBack(),
          LoadingButton(
            {
              type: "submit",
              loading: deleteQuery.loading,
            },
            "Remove"
          )
        )
      )
    );
  };
}
