import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import alert from "@grucloud/bau-ui/alert";
import alertStack from "@grucloud/bau-ui/alertStack";

export default (context: Context) => {
  const { tr, bau } = context;
  const { section } = bau.tags;

  const AlertStack = alertStack(context, { deleteAfterDuration: 20e3 });
  const Button = button(context);
  const Alert = alert(context);

  return section(
    AlertStack(),
    Button(
      {
        color: "success",
        variant: "outline",
        onclick: () => {
          document.dispatchEvent(
            new CustomEvent("alert.add", {
              detail: {
                Component: () =>
                  Alert(
                    {
                      color: "success",
                    },
                    tr("Infrastructure Created")
                  ),
              },
            })
          );
        },
      },
      "Success Alert"
    )
  );
};
