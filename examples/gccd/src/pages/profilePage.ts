import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import input from "@grucloud/bau-ui/input";
import paper from "@grucloud/bau-ui/paper";
import button from "@grucloud/bau-ui/button";

export default function (context: Context) {
  const { bau, css, stores } = context;
  const { section, h1, footer, header, label } = bau.tags;

  const { meQuery } = stores.auth;

  const Button = button(context, { variant: "outline", color: "danger" });
  const Input = input(context, { variant: "plain", color: "neutral" });
  const Form = form(context, {
    class: css`
      min-width: 350px;
      & > header {
        text-align: center;
        & h1 {
          line-height: 0;
          font-size: 1.3rem;
        }
      }
    `,
  });
  const Paper = paper(context);

  return function ProfilePage({}) {
    return Paper(
      Form(
        { onsubmit },
        header(h1("Profile")),
        section(
          label(
            "Email",
            Input({
              value: () => meQuery.data.val.email,
              type: "email",
              disabled: true,
            })
          ),
          label(
            "Username",
            Input({
              value: () => meQuery.data.val.username,
              type: "text",
              disabled: true,
            })
          )
        ),
        footer(Button({ href: "profileDelete" }, "Danger Zone"))
      )
    );
  };
}
