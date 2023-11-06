import { Context } from "@grucloud/bau-ui/context";
import { getAccessToken } from "../../utils/authUtils";
import button from "@grucloud/bau-ui/button";
import chip from "@grucloud/bau-ui/chip";
import spinner from "@grucloud/bau-ui/spinner";

export default (context: Context) => {
  const { bau, css, window, stores } = context;
  const { div, strong, a, p, input, fieldset, legend } = bau.tags;
  const { authenticatedUserQuery } = stores.gitHub;
  const Button = button(context, { variant: "solid", color: "primary" });
  const Chip = chip(context);
  const Spinner = spinner(context);

  const githubSearchParam = () =>
    new URLSearchParams({
      state: JSON.stringify({
        redirect: window.location.href,
      }),
    }).toString();

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
        authenticatedUserQuery.data.val.login &&
        Chip(
          { variant: "outline", color: "success" },
          "Logged in as ",
          strong(authenticatedUserQuery.data.val.login)
        )
    );

  const InstallApp = () =>
    div(
      p("The GitHub App is not installed yet"),
      Button(
        {
          href: `https://github.com/apps/grucloud-console-dev/installations/new?${githubSearchParam()}`,
        },
        `Install the GitHub App`
      )
    );
  const Reconfigure = () =>
    div(
      p(
        "Need to allow and deny access to specific repositories ? ",
        a(
          {
            href: `https://github.com/apps/grucloud-console-dev/installations/new?${githubSearchParam()}`,
          },
          `Reconfigure the GitHub App`
        )
      )
    );
  return function GitSetupGitHubApp(props: any) {
    const { org_id, project_id, onAuthenticated } = props;
    console.assert(org_id);
    console.assert(project_id);
    console.assert(onAuthenticated);

    const access_token = getAccessToken({ window })(
      /github-access-token=(.[^;]*)/gi
    );
    if (access_token) {
      authenticatedUserQuery.run({ access_token });
    }
    const usernameState = bau.state("");
    bau.derive(() => {
      const username = authenticatedUserQuery.data.val.login;
      if (username) {
        usernameState.val = username;
        onAuthenticated({ username });
      }
    });

    return fieldset(
      {
        class: css`
          display: flex;
          flex-direction: column;
        `,
      },
      legend("GitHub App Authorization"),
      input({ type: "hidden", name: "username", value: usernameState }),
      Authenticating(),
      () =>
        authenticatedUserQuery.error.val || !access_token ? InstallApp() : "",
      LoggedAs(),
      () => authenticatedUserQuery.data.val.login && Reconfigure()
    );
  };
};
