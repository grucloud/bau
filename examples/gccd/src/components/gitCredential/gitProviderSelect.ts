import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import list from "@grucloud/bau-ui/list";
import buttonBack from "../../components/buttonBack";

export default (context: Context, { nextUrl }: any) => {
  const { bau, config, css } = context;
  const { section, footer, li, img } = bau.tags;
  const Button = button(context, {});
  const List = list(context);
  const ButtonBack = buttonBack(context);

  return function gitProviderSelect({}: any) {
    return section(
      {
        class: css`
          max-width: 400px;
        `,
      },
      List(
        li(
          Button(
            { href: nextUrl("method", { provider: "github" }) },
            img({
              src: `${config.base}/login/github.svg#Capa_1`,
              alt: "GitHub",
              width: 28,
              height: 28,
            }),
            "GitHub"
          )
        ),
        li(
          Button(
            { href: nextUrl("method", { provider: "gitlab" }) },
            img({
              src: `${config.base}/login/gitlab-logo.svg#Capa_1`,
              alt: "GitLab",
              width: 28,
              height: 28,
            }),
            "GitLab"
          )
        )
      ),
      footer(ButtonBack())
    );
  };
};
