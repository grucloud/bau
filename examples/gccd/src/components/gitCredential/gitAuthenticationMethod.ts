import { type Context } from "@grucloud/bau-ui/context";
import list from "@grucloud/bau-ui/list";
import button from "@grucloud/bau-ui/button";

export default function (context: Context, { nextUrl }: any) {
  const { bau, config, window } = context;
  const { div, img, li, section } = bau.tags;

  const Button = button(context);
  const List = list(context);

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

  return function GitAuthenticationMethod() {
    const provider = new URLSearchParams(window.location.search).get(
      "provider"
    );

    switch (provider) {
      case "github":
        return section(
          List(
            li(
              Button(
                { href: nextUrl("setup", { auth_type: "githubapp" }) },
                Github(),
                "GitHub App"
              )
            ),
            li(
              Button(
                { href: nextUrl("setup", { auth_type: "pac" }) },
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
                { href: nextUrl("setup", { auth_type: "oauth" }) },
                Gitlab(),
                "GitLab OAuth App"
              )
            ),
            li(
              Button(
                { href: nextUrl("setup", { auth_type: "pac" }) },
                Gitlab(),
                "GitLab Personal Access Code"
              )
            )
          )
        );
      default:
        break;
    }

    return div("Git Authentication Method not found", provider);
  };
}
