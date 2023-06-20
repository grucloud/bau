import button from "@grucloud/bau-ui/button";
import alert from "@grucloud/bau-ui/alert";
import alertStack from "@grucloud/bau-ui/alertStack";

export default (context) => {
  const { tr, bau } = context;
  const { section, h1 } = bau.tags;

  const AlertStack = alertStack(context);
  const Button = button(context);
  const Alert = alert(context);

  return function AlertStackExamples() {
    return section(
      { id: "alert-stack" },
      AlertStack(),
      h1("Alert stack"),
      Button(
        {
          raised: true,
          onclick: (event) => {
            AlertStack.add({
              component: () =>
                Alert(
                  {
                    severity: "success",
                  },
                  tr("Infrastructure Created")
                ),
            });
          },
        },
        "success alert"
      )
    );
  };
};
