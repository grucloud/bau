import { type Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import loadingButton from "@grucloud/bau-ui/loadingButton";
import button from "@grucloud/bau-ui/button";
import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";

import gitSetupGitHubApp from "../gitRepository/gitSetupGitHubApp";
import gitPersonalAccessCodeGitHub from "../gitCredential/gitPersonalAccessCodeGitHub";
import gitSetupGitLabOAuth from "../gitRepository/gitSetupGitLabOAuth";
import gitPersonalAccessCodeGitLab from "../gitCredential/gitPersonalAccessCodeGitLab";
import gitRepositoryBranch from "../gitRepository/gitRepositoryBranch";

export default function (context: Context) {
  const { bau, css, window, stores, config } = context;
  const { h2, section, fieldset, legend, footer, img } = bau.tags;

  const Form = form(context);
  const RadioButtonGroup = radioButtonGroup(context);

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
  const GitRepositoryBranch = gitRepositoryBranch(context);

  const onsubmit =
    ({ onSubmitted, org_id, project_id }: any) =>
    async (event: any) => {
      console.assert(org_id);
      console.assert(project_id);
      console.assert(onSubmitted);
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      await stores.project.patchQuery.run({ org_id, project_id }, payload);
      onSubmitted({ ...payload, org_id, project_id });
    };

  const className = css`
    display: inline-flex;
    gap: 1rem;
    & label {
      flex-direction: row;
      align-items: center;
      padding: 0.5rem;
      border: 1px dotted var(--color-emphasis-200);
      border-radius: var(--global-radius);
    }
    & legend {
      font-size: smaller;
    }
  `;

  const oninputRadio = (radioState: any) => (event: any) => {
    const search = new URLSearchParams(window.location.search);
    search.delete(event.target.name);
    search.append(event.target.name, event.target.value);
    window.history.pushState("", "", `?${search.toString()}`);
    radioState.val = event.target.value;
  };

  const GithubImg = () =>
    img({
      src: `${config.base}/login/github.svg#Capa_1`,
      alt: "GitHub",
      width: 28,
      height: 28,
    });

  const GitlabImg = () =>
    img({
      src: `${config.base}/login/gitlab-logo.svg#Capa_1`,
      alt: "GitLab",
      width: 28,
      height: 28,
    });

  const GitProviderRadioButtons = ({ radioStateProviderType }: any) => {
    return fieldset(
      {
        class: className,
      },
      legend("Source Code Provider"),
      RadioButtonGroup({
        oninput: oninputRadio(radioStateProviderType),
        name: "git_provider_type",
        value: radioStateProviderType.val,
        radios: [
          { value: "GitHub", Label: () => [GithubImg(), "GitHub"] },
          { value: "GitLab", Label: () => [GitlabImg(), "GitLab"] },
        ],
      })
    );
  };

  function GitAuthType({ git_provider_type, radioStateAuthType }: any) {
    switch (git_provider_type) {
      case "GitHub":
        return RadioButtonGroup({
          oninput: oninputRadio(radioStateAuthType),
          name: "git_auth_type",
          value: radioStateAuthType.val,
          radios: [
            { value: "GitHubApp", Label: () => "GitHub App" },
            {
              value: "PersonalAccessCode",
              Label: () => "Personal Access Code",
            },
          ],
        });

      case "GitLab":
        return RadioButtonGroup({
          oninput: oninputRadio(radioStateAuthType),
          name: "git_auth_type",
          value: radioStateAuthType.val,
          radios: [
            { value: "OAuth", Label: () => "OAuth App" },
            {
              value: "PersonalAccessCode",
              Label: () => "Personal Access Code",
            },
          ],
        });
      default:
        return "";
    }
  }

  const GitAuthenticationContent = (props: any) => {
    const { git_provider_type, git_auth_type } = props;
    console.assert(git_provider_type);
    console.assert(git_auth_type);

    switch (git_provider_type) {
      case "GitHub":
        switch (git_auth_type) {
          case "GitHubApp":
            return GitSetupGitHubApp(props);
          case "PersonalAccessCode":
            return GitPersonalAccessCodeGitHub(props);
        }
        break;
      case "GitLab":
        switch (git_auth_type) {
          case "OAuth":
            return GitSetupGitLabOAuth(props);
          case "PersonalAccessCode":
            return GitPersonalAccessCodeGitLab(props);
        }
        break;
      default:
        break;
    }

    return "";
  };

  return function gitConfig(props: any) {
    const { org_id, project_id, previousHref, edit } = props;
    console.assert(org_id);
    console.assert(project_id);
    const search = new URLSearchParams(window.location.search);

    const radioStateProviderType = bau.state(
      search.get("git_provider_type") ?? props.git_provider_type
    );
    const radioStateAuthType = bau.state(
      search.get("git_auth_type") ?? props.git_auth_type
    );
    const isAuthenticatedState = bau.state(false);
    return Form(
      {
        onsubmit: onsubmit(props),
        class: css`
          max-width: 600px;
        `,
      },
      section(
        h2("Git config"),
        GitProviderRadioButtons({ radioStateProviderType }),
        () =>
          radioStateProviderType.val &&
          fieldset(
            { class: className },
            legend("Authentication Method"),
            GitAuthType({
              git_provider_type: radioStateProviderType.val,
              radioStateAuthType,
            })
          ),
        () =>
          radioStateAuthType.val &&
          GitAuthenticationContent({
            org_id,
            project_id,
            git_provider_type: radioStateProviderType.val,
            git_auth_type: radioStateAuthType.val,
            onAuthenticated: () => {
              isAuthenticatedState.val = true;
            },
          }),
        bau.bind({
          deps: [isAuthenticatedState, radioStateProviderType],
          render:
            ({ element }) =>
            (isAuthenticated, git_provider_type) => {
              if (element && isAuthenticated) {
                const formEl = element.closest("form");
                if (!formEl) return;
                const formData = new FormData(formEl);
                const username = formData.get("username");
                const password = formData.get("password");
                return GitRepositoryBranch({
                  ...props,
                  git_provider_type,
                  username,
                  password,
                });
              } else if (edit) {
                return GitRepositoryBranch(props);
              }
            },
        })
      ),
      footer(
        previousHref && ButtonPrevious({ href: previousHref }, "Previous"),
        LoadingButton(
          { type: "submit", loading: stores.project.patchQuery.loading },
          "Save"
        )
      )
    );
  };
}
