import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import loadingButton from "@grucloud/bau-ui/loadingButton";

import buttonBack from "../../components/buttonBack";
import page from "../../components/page";
import gitCredentialFormCreateContent from "../../components/gitCredential/gitCredentialFormContent";

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

  const GitCredentialCreateContent = gitCredentialFormCreateContent(context);

  return function GitCredentialCreatePage({ org_id }: any) {
    const onsubmit = async (event: any) => {
      event.preventDefault();
      const { username, password } = event.target.elements;

      const { git_credential_id } = await stores.gitCredential.createQuery.run(
        { org_id },
        {
          username: username.value,
          password: password.value,
        }
      );

      window.history.pushState(
        "",
        "",
        `${config.base}/org/${org_id}/git_credential/${git_credential_id}`
      );
    };

    return Page(
      Form(
        { onsubmit },
        header(h1("Create new Git credentials")),
        p(),
        GitCredentialCreateContent({}),
        footer(
          LoadingButton(
            {
              type: "submit",
              loading: stores.gitCredential.createQuery.loading,
            },
            "Create"
          ),
          ButtonBack()
        )
      )
    );
  };
}
