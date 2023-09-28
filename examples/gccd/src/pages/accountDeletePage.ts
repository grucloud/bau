import { Context } from "@grucloud/bau-ui/context";
import alert from "@grucloud/bau-ui/alert";

import paper from "@grucloud/bau-ui/paper";
import button from "@grucloud/bau-ui/button";
import formDestroy from "../components/formDestroy";
import buttonBack from "../components/buttonBack";
import inputDelete from "../components/inputDelete";

export default function (context: Context) {
  const { bau, stores, window, config } = context;
  const { section, h1, footer, header, label } = bau.tags;

  const Alert = alert(context, { color: "success" });
  const FormDestroy = formDestroy(context);
  const ButtonBack = buttonBack(context);

  const { accountDeleteQuery } = stores.auth;

  const Button = button(context);

  const Paper = paper(context);
  const InputDelete = inputDelete(context);

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
      FormDestroy(
        { onsubmit },
        header(h1("Account Deletion")),
        section(
          label(
            "To prevent accidental deletion, please type 'delete' in the input field.",
            InputDelete()
          )
        ),
        footer(
          ButtonBack(),
          Button(
            {
              type: "submit",
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
