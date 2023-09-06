import { Context } from "@grucloud/bau-ui/context";
import alert from "@grucloud/bau-ui/alert";

import form from "@grucloud/bau-ui/form";
import input from "@grucloud/bau-ui/input";
import paper from "@grucloud/bau-ui/paper";
import button from "@grucloud/bau-ui/button";

export default function (context: Context) {
  const { bau, css, stores, window, config } = context;
  const { section, h1, footer, header, label } = bau.tags;

  const Alert = alert(context, { color: "success" });

  const { accountDeleteQuery } = stores.auth;

  const Button = button(context);
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

  const onsubmit = async (event: any) => {
    event.preventDefault();
    await accountDeleteQuery.run();
    window.document.dispatchEvent(
      new CustomEvent("alert.add", {
        detail: {
          Component: () => Alert("Account Deleted"),
        },
      })
    );
    window.history.pushState("", "", config.loginPath);
  };

  return function UserDeletePage({}) {
    return Paper(
      Form(
        { onsubmit },
        header(h1("Account Deletion")),
        section(
          label(
            "To prevent accidental deletion, please type 'delete' in the input field.",
            Input({
              type: "text",
              placeholder: "Type delete",
              autocomplete: false,
              autofocus: true,
              name: "confirmation",
              pattern: String.raw`delete`,
              required: true,
            })
          )
        ),
        footer(
          Button(
            {
              variant: "outline",
              color: "neutral",
              onclick: () => window.history.back(),
            },
            "Cancel"
          ),
          Button(
            {
              type: "submit",
              "data-user-button-delete": true,
              variant: "solid",
              color: "danger",
            },
            "Delete Account"
          )
        )
      )
    );
  };
}
