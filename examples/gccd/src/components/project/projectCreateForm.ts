import { type Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import loadingButton from "@grucloud/bau-ui/loadingButton";
import button from "@grucloud/bau-ui/button";

import projectCreateContent from "./projectCreateContent";

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
  const ProjectCreateContent = projectCreateContent(context);

  const onsubmit =
    ({ onSubmitted, org_id }: any) =>
    async (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(
        new FormData(event.target.closest("form"))
      );
      try {
        await stores.project.createQuery.run({ org_id }, payload);
        onSubmitted(payload);
      } catch (error) {}
    };

  return function ProjectCreateForm({
    org_id,
    onSubmitted,
    previousHref,
  }: any) {
    return Form(
      { onsubmit: onsubmit({ onSubmitted, org_id }) },
      ProjectCreateContent({}),
      footer(
        ButtonPrevious({ href: previousHref }, "Previous"),
        LoadingButton(
          { type: "submit", loading: stores.project.createQuery.loading },
          "Create Project"
        )
      )
    );
  };
}
