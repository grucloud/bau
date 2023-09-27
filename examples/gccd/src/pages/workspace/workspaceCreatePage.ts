import { Context } from "@grucloud/bau-ui/context";
import loadingButton from "@grucloud/bau-ui/loadingButton";

import form from "@grucloud/bau-ui/form";
import buttonBack from "../../components/buttonBack";
import page from "../../components/page";
import workspaceCreateContent from "../../components/workspace/workspaceCreateContent";

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

  const WorkspaceCreateContent = workspaceCreateContent(context);

  return function WorkspaceCreatePage({ org_id, project_id }: any) {
    const onsubmit = async (event: any) => {
      event.preventDefault();
      const { workspace_id } = event.target.elements;

      const {} = await stores.workspace.createQuery.run(
        { org_id, project_id },
        {
          workspace_id: workspace_id.value,
        }
      );

      window.history.pushState(
        "",
        "",
        `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id.value}`
      );
    };

    return Page(
      Form(
        { onsubmit },
        header(h1("Create a new workspace")),
        p(),
        WorkspaceCreateContent({}),
        footer(
          LoadingButton(
            { type: "submit", loading: stores.workspace.createQuery.loading },
            "Create"
          ),
          ButtonBack()
        )
      )
    );
  };
}
