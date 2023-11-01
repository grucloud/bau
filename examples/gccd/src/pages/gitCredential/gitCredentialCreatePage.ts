import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
import list from "@grucloud/bau-ui/list";
import button from "@grucloud/bau-ui/button";
import loadingButton from "@grucloud/bau-ui/loadingButton";

import buttonBack from "../../components/buttonBack";
import buttonNext from "../../components/buttonNext";

import page from "../../components/page";
import gitPersonalAccessCodeGitHub from "../../components/gitCredential/gitPersonalAccessCodeGitHub";
import gitPersonalAccessCodeGitLab from "../../components/gitCredential/gitPersonalAccessCodeGitLab";

import gitCredentialSelect from "../../components/gitCredential/gitProviderSelect";
import gitSetupGitHubApp from "../../components/gitRepository/gitSetupGitHubApp";
import gitSetupGitLabOAuth from "../../components/gitRepository/gitSetupGitLabOAuth";

export default function (context: Context) {
  const { bau, stores, config, window } = context;
  const { h1, header, footer, div, a, img, li, section } = bau.tags;
  const ButtonBack = buttonBack(context);
  const ButtonNext = buttonNext(context);

  const LoadingButton = loadingButton(context, {
    color: "primary",
    variant: "solid",
  });
  const Button = button(context);
  const Page = page(context);
  const Form = form(context);
  const Stepper = stepper(context);
  const List = list(context);

  const GitPersonalAccessCodeGitHub = gitPersonalAccessCodeGitHub(context);
  const GitPersonalAccessCodeGitLab = gitPersonalAccessCodeGitLab(context);
  const GitCredentialSelect = gitCredentialSelect(context);
  const GitSetupGitHubApp = gitSetupGitHubApp(context);
  const GitSetupGitLabOAuth = gitSetupGitLabOAuth(context);
  const GitAuthenticationMethod = () => {
    const provider = new URLSearchParams(window.location.search).get(
      "provider"
    );

    const Github = () =>
      img({
        src: `${config.base}/login/github.svg#Capa_1`,
        alt: "GitHub",
        width: 28,
        height: 28,
      });

    const Gitlab = () =>
      img({
        src: `${config.base}/login/gitlab-logo.svg#Capa_1`,
        alt: "GitLab",
        width: 28,
        height: 28,
      });

    switch (provider) {
      case "github":
        return section(
          List(
            li(
              Button(
                { href: "?provider=github&auth_type=githubapp#setup" },
                Github(),
                "GitHub App"
              )
            ),
            li(
              Button(
                { href: "?provider=github&auth_type=pac#setup" },
                Github(),
                "GitHub Personal Access Code"
              )
            )
          )
        );
      case "gitlab":
        return section(
          List(
            li(
              Button(
                { href: "?provider=gitlab&auth_type=oauth#setup" },
                Gitlab(),
                "GitLab OAuth App"
              )
            ),
            li(
              Button(
                { href: "?provider=gitlab&auth_type=pac#setup" },
                Gitlab(),
                "GitLab Personal Access Code"
              )
            )
          )
        );
      default:
        break;
    }

    return div("GitAuthenticationMethod", provider);
  };

  const getStateFromUrl = () => {
    const search = new URLSearchParams(window.location.search);
    return {
      provider: search.get("provider"),
      auth_type: search.get("auth_type"),
    };
  };

  const GitSetupFooter = () =>
    footer(ButtonNext({ href: "#repo" }), ButtonBack());

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

  const GitRepositoryBranch = () =>
    div(
      "GitRepositoryBranch",
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
    );

  return function GitCredentialCreatePage(props: any) {
    const { org_id } = props;
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

      window.history.pushState(
        "",
        "",
        `${config.base}/org/${org_id}#vcsProvider  `
      );
    };

    const activeStepIndex = bau.state(0);

    const stepperDefs: StepperPage[] = [
      {
        name: "provider",
        Header: () => a({ href: "#provider" }, "Git provider"),
        Content: () => GitCredentialSelect({}),
      },
      {
        name: "method",
        Header: () => "Authentication Method",
        Content: () => GitAuthenticationMethod(),
      },
      {
        name: "setup",
        Header: () => "Setup",
        Content: () => section(GitHubSetup(props), GitSetupFooter()),
      },
      {
        name: "repo",
        Header: () => "Repository and Branch",
        Content: () => GitRepositoryBranch(),
      },
    ];

    return Page(
      Form(
        { onsubmit },
        header(h1("Create new Git credentials")),
        Stepper({ stepperDefs, activeStepIndex })
      )
    );
  };
}
