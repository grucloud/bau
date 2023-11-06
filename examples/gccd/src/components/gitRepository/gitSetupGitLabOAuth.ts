import { Context } from "@grucloud/bau-ui/context";
import { getAccessToken } from "../../utils/authUtils";
import button from "@grucloud/bau-ui/button";
import chip from "@grucloud/bau-ui/chip";
import spinner from "@grucloud/bau-ui/spinner";

export default (context: Context) => {
  const { bau, window, stores, config } = context;
  const { div, strong, p, input, fieldset, legend } = bau.tags;
  const { authenticatedUserQuery } = stores.gitLab;
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

  const InstallOAuthApp = () =>
    div(
      p("Not authorized to Gitlab"),
      Button(
        {
          href: `${window.location.origin}${
            config.apiUrl
          }auth/gitlab?${new URLSearchParams({
            nextPath: window.location.href,
          }).toString()}`,
        },
        "Authenticate with GitLab"
      )
    );

  return function GitSetupGitLabOAuth(props: any) {
    const { org_id, project_id, onAuthenticated } = props;
    console.assert(org_id);
    console.assert(project_id);
    console.assert(onAuthenticated);

    const access_token = getAccessToken({ window })(
      /gitlab-access-token=(.[^;]*)/gi
    );
    if (access_token) {
      authenticatedUserQuery.run({ access_token });
    }
    const usernameState = bau.state("");

    bau.derive(() => {
      const username = authenticatedUserQuery.data.val.username;
      if (username) {
        usernameState.val = username;
        onAuthenticated({ username });
      }
    });

    return fieldset(
      legend("GitLab OAuth"),
      input({ type: "hidden", name: "username", value: usernameState }),
      Authenticating(),
      () =>
        authenticatedUserQuery.error.val || !access_token
          ? InstallOAuthApp()
          : "",
      LoggedAs()
    );
  };
};
