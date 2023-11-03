import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import loadingButton from "@grucloud/bau-ui/loadingButton";

import gitRepositoryFormContent from "./gitRepositoryFormContent";

export default function (context: Context) {
  const { bau, stores } = context;
  const { h1, header, footer } = bau.tags;
  const LoadingButton = loadingButton(context, {
    color: "primary",
    variant: "solid",
  });
  const Form = form(context);

  const GitRepositoryFormContent = gitRepositoryFormContent(context);

  return function GitRepositoryForm(props: any) {
    const { org_id, project_id, workspace_id } = props;
    stores.gitRepository.getByIdQuery.run({ org_id, project_id, workspace_id });

    const onsubmit = async (event: any) => {
      event.preventDefault();
      const { branch, repository, git_credentials } = event.target.elements;
      await stores.gitRepository.createQuery.run(
        { org_id, project_id, workspace_id },
        {
          branch: branch.value,
          repository_url: repository.value,
          git_credential_id: git_credentials.value,
        }
      );
    };

    return Form(
      { onsubmit },
      header(h1("Link a new Git Repository")),
      () =>
        GitRepositoryFormContent(stores.gitRepository.getByIdQuery.data.val),
      footer(
        LoadingButton(
          {
            type: "submit",
            loading: stores.gitRepository.createQuery.loading,
          },
          "Save"
        )
      )
    );
  };
}
