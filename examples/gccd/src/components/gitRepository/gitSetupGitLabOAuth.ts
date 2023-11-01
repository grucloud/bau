import { Context } from "@grucloud/bau-ui/context";
import { getAccessToken } from "../../utils/authUtils";
import button from "@grucloud/bau-ui/button";
import chip from "@grucloud/bau-ui/chip";
import spinner from "@grucloud/bau-ui/spinner";

export default (context: Context) => {
  const { bau, css, window, stores, config } = context;
  const { section, div, h2, strong, p, input } = bau.tags;
  const { authenticatedUserQuery, listRepoQuery } = stores.gitLab;
  const Button = button(context, { variant: "solid", color: "primary" });
  const Chip = chip(context);
  const Spinner = spinner(context);

  const Authenticating = () => () =>
    authenticatedUserQuery.loading.val
      ? div(
          Chip(
            { variant: "outline", color: "neutral" },
            Spinner(),
            " Authenticating"
          )
        )
      : "";

  const LoggedAs = () =>
    div(
      () =>
        authenticatedUserQuery.data.val.username &&
        Chip(
          { variant: "outline", color: "success" },
          "Logged in as ",
          strong(authenticatedUserQuery.data.val.username)
        )
    );

  const InstallOAuthApp = ({ gitlabSearchParam }: any) =>
    div(
      p("Not authorized to Gitlab"),
      Button(
        {
          href: `${window.location.origin}${config.apiUrl}auth/gitlab?${gitlabSearchParam}`,
        },
        "Authenticate with GitLab"
      )
    );

  return function GitSetupGitLabOAuth(props: any) {
    const { org_id } = props;
    const redirect = `/org/${org_id}/git_credential/create?provider=gitlab&auth_type=oauth#setup`;

    const gitlabSearchParam = new URLSearchParams({
      nextPath: redirect,
    }).toString();

    const access_token = getAccessToken({ window })(
      /gitlab-access-token=(.[^;]*)/gi
    );
    if (access_token) {
      authenticatedUserQuery.run({ access_token });
    }
    const usernameState = bau.state("");

    bau.derive(() => {
      const username = authenticatedUserQuery.data.val.username;
      if (username && !listRepoQuery.data.val.length) {
        usernameState.val = username;
        listRepoQuery.run({ username });
      }
    });

    return section(
      {
        class: css`
          display: flex;
          flex-direction: column;
          min-height: 200px;
        `,
      },
      h2("GitLab OAuth"),
      input({ type: "hidden", name: "username", value: usernameState }),
      Authenticating(),
      () =>
        authenticatedUserQuery.error.val || !access_token
          ? InstallOAuthApp({ gitlabSearchParam })
          : "",
      LoggedAs()
    );
  };
};
