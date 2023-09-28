import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import form from "@grucloud/bau-ui/form";
import buttonBack from "../../components/buttonBack";
import page from "../../components/page";
import gitCredentialFormContent from "../../components/gitCredential/gitCredentialFormContent";

export default function (context: Context) {
  const { bau, stores, config, window } = context;
  const { h1, p, header, footer, h2 } = bau.tags;
  const ButtonBack = buttonBack(context);
  const ButtonEdit = button(context, { color: "primary", variant: "solid" });
  const Page = page(context);
  const Form = form(context);
  const ButtonDelete = button(context, { variant: "outline", color: "danger" });

  const GitCredentialFormContent = gitCredentialFormContent(context);

  return function GitCredentialEditPage({ org_id, git_credential_id }: any) {
    const onsubmit = async (event: any) => {
      event.preventDefault();
      const { username, password } = event.target.elements;

      await stores.gitCredential.patchQuery.run(
        { org_id, git_credential_id },
        {
          username: username.value,
          password: password.value,
        }
      );

      window.history.pushState("", "", `${config.base}/org/${org_id}`);
    };

    return Page(
      Form(
        { onsubmit },
        header(h1("Edit Git credentials")),
        p(),
        GitCredentialFormContent({ username: "TODO" }),
        footer(ButtonEdit({ type: "submit" }, "Save"), ButtonBack()),
        h2("Danger Zone"),
        ButtonDelete({ href: `${git_credential_id}/destroy` }, "Danger Zone")
      )
    );
  };
}
