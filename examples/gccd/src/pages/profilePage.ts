import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import input from "@grucloud/bau-ui/input";
import button from "@grucloud/bau-ui/button";

export default function (context: Context) {
  const { bau, stores } = context;
  const { section, h1, footer, header, label } = bau.tags;

  const { meQuery } = stores.auth;

  const Button = button(context, { variant: "outline", color: "danger" });
  const Input = input(context, { variant: "plain", color: "neutral" });
  const Form = form(context);

  return function ProfilePage({}) {
    return Form(
      // TODO onsubmit
      {},
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
      footer(Button({ href: "accountDelete" }, "Danger Zone"))
    );
  };
}
