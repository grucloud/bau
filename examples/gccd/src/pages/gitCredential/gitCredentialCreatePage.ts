import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
import loadingButton from "@grucloud/bau-ui/loadingButton";
import button from "@grucloud/bau-ui/button";

import page from "../../components/page";
import gitPersonalAccessCodeGitHub from "../../components/gitCredential/gitPersonalAccessCodeGitHub";
import gitPersonalAccessCodeGitLab from "../../components/gitCredential/gitPersonalAccessCodeGitLab";
import gitCredentialSelect from "../../components/gitCredential/gitProviderSelect";
import gitSetupGitHubApp from "../../components/gitRepository/gitSetupGitHubApp";
import gitSetupGitLabOAuth from "../../components/gitRepository/gitSetupGitLabOAuth";
import gitAuthenticationMethod from "../../components/gitCredential/gitAuthenticationMethod";

const stepperName = "git_credential";

export default function (context: Context) {
  const { bau, stores, window } = context;
  const { h1, footer, div, section } = bau.tags;

  const LoadingButton = loadingButton(context, {
    color: "primary",
    variant: "solid",
  });
  const Page = page(context);
  const Form = form(context);
  const Stepper = stepper(context);
  const nextUrl = NextUrl(context, stepperName);

  const ButtonPrevious = button(context, {
    variant: "outline",
    color: "primary",
  });

  const GitAuthenticationMethod = gitAuthenticationMethod(context, { nextUrl });
  const GitPersonalAccessCodeGitHub = gitPersonalAccessCodeGitHub(context);
  const GitPersonalAccessCodeGitLab = gitPersonalAccessCodeGitLab(context);
  const GitCredentialSelect = gitCredentialSelect(context, { nextUrl });
  const GitSetupGitHubApp = gitSetupGitHubApp(context);
  const GitSetupGitLabOAuth = gitSetupGitLabOAuth(context);

  const getStateFromUrl = () => {
    const search = new URLSearchParams(window.location.search);
    return {
      provider: search.get("provider"),
      auth_type: search.get("auth_type"),
    };
  };

  const GitHubSetup = (props: any) => {
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

  return function GitCredentialCreatePage(props: any) {
    const { org_id, onSubmitted } = props;
    const onsubmit = async (event: any) => {
      event.preventDefault();
      const { provider, auth_type } = getStateFromUrl();
      const { username, password } = event.target.elements;
      await stores.gitCredential.createQuery.run(
        { org_id },
        {
          username: username.value,
          password: password?.value ?? "",
          provider,
          auth_type,
        }
      );
      onSubmitted();
    };

    const stepperDefs: StepperPage[] = [
      {
        name: "provider",
        Header: () => "Git provider",
        Content: () => GitCredentialSelect({}),
      },
      {
        name: "method",
        Header: () => "Authentication Method",
        Content: () =>
          Form(
            GitAuthenticationMethod(),
            footer(ButtonPrevious({ href: nextUrl("provider") }, "Previous"))
          ),
      },
      {
        name: "setup",
        Header: () => "Setup",
        Content: () =>
          Form(
            { onsubmit },
            section(
              GitHubSetup(props),
              footer(
                LoadingButton(
                  {
                    type: "submit",
                    loading: stores.gitCredential.createQuery.loading,
                  },
                  "Create"
                ),
                ButtonPrevious({ href: nextUrl("method") }, "Previous")
              )
            )
          ),
      },
    ];

    return Page(
      h1("Create new Git credentials"),
      Stepper({ stepperDefs, stepperName })
    );
  };
}
