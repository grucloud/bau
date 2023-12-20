import { type Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import loadingButton from "@grucloud/bau-ui/loadingButton";
import button from "@grucloud/bau-ui/button";

import workspaceCreateContent from "./workspaceCreateContent";

export default function (context: Context) {
  const { bau, stores } = context;
  const { footer } = bau.tags;
  const Form = form(context);
  const ButtonPrevious = button(context, {
    variant: "outline",
    color: "primary",
  });
  const LoadingButton = loadingButton(context, {
    color: "primary",
    variant: "solid",
  });
  const WorkspaceCreateContent = workspaceCreateContent(context);

  const onsubmit =
    ({ onSubmitted, org_id, project_id }: any) =>
    async (event: any) => {
      event.preventDefault();
      console.assert(onSubmitted);
      console.log(org_id);
      console.log(project_id);
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      try {
        await stores.workspace.createQuery.run({ org_id, project_id }, payload);
        onSubmitted({ ...payload, org_id, project_id });
      } catch (error) {}
    };

  return function WorkspaceCreateForm({
    org_id,
    project_id,
    onSubmitted,
    previousHref,
  }: any) {
    return Form(
      { onsubmit: onsubmit({ onSubmitted, org_id, project_id }) },
      WorkspaceCreateContent({}),
      footer(
        previousHref && ButtonPrevious({ href: previousHref }, "Previous"),
        LoadingButton(
          { type: "submit", loading: stores.workspace.createQuery.loading },
          "Create Workspace"
        )
      )
    );
  };
}
