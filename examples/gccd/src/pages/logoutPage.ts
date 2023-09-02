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
      min-width: 350px;
      text-align: center;
      & > header {
        text-align: center;
        & h1 {
          line-height: 0;
          font-size: 1.3rem;
        }
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
    const { logoutQuery } = stores.auth;
    logoutQuery.run();

    return Paper(
      Form(
        {},
        header(
          img({ width: "100", src: `${config.base}/gc.svg` }),
          h1("Logout from Grucloud")
        ),
        section(() =>
          logoutQuery.loading ? "Logout ..." : "Successfully logged out."
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
