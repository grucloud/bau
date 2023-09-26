import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import spinner from "@grucloud/bau-ui/spinner";
import button from "@grucloud/bau-ui/button";

import page from "../../components/page";
import workspaceDetailContent from "../../components/workspace/workspaceDetailContent";

export default function (context: Context) {
  const { bau, stores } = context;
  const { h1, h2, header } = bau.tags;
  const { getByIdQuery } = stores.workspace;

  const Page = page(context);
  const Form = form(context);
  const Spinner = spinner(context, { size: "lg" });
  const ButtonAddWorkspace = button(context, {
    color: "primary",
    variant: "solid",
  });

  const WorkspaceDetailContent = workspaceDetailContent(context);
  return function WorkspaceDetailPage({
    org_id,
    project_id,
    workspace_id,
  }: any) {
    getByIdQuery.run({ org_id, project_id, workspace_id });

    return Page(
      Form(
        header(
          h1("Workspace Details"),
          ButtonAddWorkspace(
            {
              href: `${workspace_id}/runs/create`,
            },
            "+ New Run"
          )
        ),
        () =>
          !getByIdQuery.loading.val &&
          WorkspaceDetailContent(getByIdQuery.data.val),
        h2()
      ),
      Spinner({
        visibility: getByIdQuery.loading,
      })
    );
  };
}
