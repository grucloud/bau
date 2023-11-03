import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import loadingButton from "@grucloud/bau-ui/loadingButton";
import button from "@grucloud/bau-ui/button";

import gitRepositoryBranch from "./gitRepositoryBranch";

export default function (context: Context) {
  const { bau, stores } = context;
  const { h1, header, footer } = bau.tags;
  const ButtonPrevious = button(context, {
    variant: "outline",
    color: "primary",
  });
  const LoadingButton = loadingButton(context, {
    color: "primary",
    variant: "solid",
  });
  const Form = form(context);

  const GitRepositoryBranch = gitRepositoryBranch(context);

  return function GitRepositoryCreateForm(props: any) {
    const {
      org_id,
      project_id,
      workspace_id,
      git_credential_id,
      onSubmitted,
      previousHref,
    } = props;
    console.assert(org_id);
    console.assert(git_credential_id);
    console.assert(onSubmitted);
    console.assert(previousHref);

    stores.gitCredential.getByIdQuery.run({ org_id, git_credential_id });

    const onsubmit = async (event: any) => {
      event.preventDefault();
      await stores.gitRepository.createQuery.run(
        { org_id, project_id, workspace_id },
        {
          ...Object.fromEntries(new FormData(event.target.closest("form"))),
          git_credential_id,
        }
      );
      onSubmitted(props);
    };

    return Form(
      { onsubmit },
      header(h1("Link to a new Git Repository")),
      () =>
        stores.gitCredential.getByIdQuery.loading.val
          ? "Loading"
          : GitRepositoryBranch(stores.gitCredential.getByIdQuery.data.val),
      footer(
        LoadingButton(
          {
            type: "submit",
            loading: stores.gitRepository.createQuery.loading,
          },
          "Save"
        ),
        ButtonPrevious({ href: previousHref }, "Previous")
      )
    );
  };
}
