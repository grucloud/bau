import form from "@grucloud/bau-ui/form";
import paper from "@grucloud/bau-ui/paper";
import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css, config, stores } = context;
  const { section, h1, footer, header, img } = bau.tags;

  const Button = button(context);
  const Form = form(context, {
    class: css`
      & > header {
        text-align: center;
      }
      & > footer {
        & a {
          flex-grow: 1;
        }
      }
    `,
  });

  const Paper = paper(context);

  return function LogoutPage() {
    const { logout, logoutQuery } = stores.auth;
    logout();
    return Paper(
      Form(
        header(
          img({ width: "100", src: `${config.base}/gc.svg`, alt: "GruCloud" }),
          h1("Logout from Grucloud")
        ),
        section(() =>
          logoutQuery.loading.val ? "Logout ..." : "Successfully logged out."
        ),
        footer(
          Button(
            {
              variant: "solid",
              color: "primary",
              href: `${config.base}/login`,
            },
            "Login"
          )
        )
      )
    );
  };
};
