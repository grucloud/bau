import alert from "@grucloud/bau-ui/alert";

import { Context } from "../context";

export default (context: Context) => {
  const { tr, bau } = context;
  const { section, div, h3, h2, h4, p } = bau.tags;
  const Alert = alert(context);
  return () =>
    section(
      { id: "alert" },
      h2(tr("Alert Examples")),
      h3("Info"),
      div(
        Alert(
          {
            severity: "danger",
          },
          h4("Something went wrong"),
          p("Error code ", 404),
          p("Status ", "Not Found")
        ),
        Alert(
          {
            severity: "warning",
            onRemove: (event: any) => {
              event.preventDefault();
            },
          },
          "Alert warning"
        ),
        Alert(
          {
            severity: "info",
          },
          "My Message"
        ),
        Alert(
          {
            severity: "success",
          },
          h4("Great Success"),
          p("Alert success message")
        )
      )
    );
};
