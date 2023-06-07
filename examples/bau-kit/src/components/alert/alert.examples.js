import alert from "./alert";

export default (context) => {
  const { tr, bau } = context;
  const { section, div, h3, h2 } = bau.tags;
  const Alert = alert(context);
  return () =>
    section(
      h2(tr("Alert Examples")),
      h3("Info"),
      div(
        Alert({
          severity: "error",
          name: "Trouble Ahead",
          message:
            "Error occured while trying to proxy to: localhost:8080/api/v1/me",
        }),
        Alert({
          severity: "warning",
          name: "Alert warning",
          onRemove: (event) => {
            event.preventDefault();
          },
        }),
        Alert({
          severity: "info",
          name: "info message",
          message: "My Message",
        }),
        Alert({
          severity: "success",
          name: "Great Success",
          message: "Alert success message",
        })
      )
    );
};
