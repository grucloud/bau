import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import loadingButton from "@grucloud/bau-ui/loadingButton";
import button from "@grucloud/bau-ui/button";

import gitSetupGitHubApp from "../gitRepository/gitSetupGitHubApp";
import gitPersonalAccessCodeGitHub from "./gitPersonalAccessCodeGitHub";
import gitSetupGitLabOAuth from "../gitRepository/gitSetupGitLabOAuth";
import gitPersonalAccessCodeGitLab from "./gitPersonalAccessCodeGitLab";

export default function (context: Context) {
  const { bau, stores, window } = context;
  const { footer, div, section } = bau.tags;

  const Form = form(context);
  const ButtonPrevious = button(context, {
    variant: "outline",
    color: "primary",
  });
  const LoadingButton = loadingButton(context, {
    color: "primary",
    variant: "solid",
  });

  const GitPersonalAccessCodeGitHub = gitPersonalAccessCodeGitHub(context);
  const GitPersonalAccessCodeGitLab = gitPersonalAccessCodeGitLab(context);
  const GitSetupGitHubApp = gitSetupGitHubApp(context);
  const GitSetupGitLabOAuth = gitSetupGitLabOAuth(context);

  const getStateFromUrl = () => {
    const search = new URLSearchParams(window.location.search);
    return {
      provider: search.get("provider"),
      auth_type: search.get("auth_type"),
    };
  };

  const GitAuthenticationContent = (props: any) => {
    const { provider, auth_type } = getStateFromUrl();
    switch (provider) {
      case "github":
        switch (auth_type) {
          case "githubapp":
            return GitSetupGitHubApp(props);
          case "pac":
            return GitPersonalAccessCodeGitHub(props);
        }
        break;
      case "gitlab":
        switch (auth_type) {
          case "oauth":
            return GitSetupGitLabOAuth(props);
          case "pac":
            return GitPersonalAccessCodeGitLab(props);
        }
        break;
      default:
        break;
    }

    return div("Unknown ", provider, auth_type);
  };

  return function GitAuthenticationCreateForm(props: any) {
    const { org_id, onSubmitted, previousHref } = props;
    const onsubmit = async (event: any) => {
      event.preventDefault();
      const { provider, auth_type } = getStateFromUrl();
      const { username, password } = event.target.elements;
      const { git_credential_id } = await stores.gitCredential.createQuery.run(
        { org_id },
        {
          username: username.value,
          password: password?.value ?? "",
          provider,
          auth_type,
        }
      );
      onSubmitted({ org_id, git_credential_id });
    };

    return Form(
      { onsubmit },
      section(
        GitAuthenticationContent(props),
        footer(
          LoadingButton(
            {
              type: "submit",
              loading: stores.gitCredential.createQuery.loading,
            },
            "Create"
          ),
          ButtonPrevious({ href: previousHref }, "Previous")
        )
      )
    );
  };
}
