import alert from "@grucloud/bau-ui/alert";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { h4, p } = bau.tags;

  const Alert = alert(context);
  return Alert(
    {
      color: "danger",
    },
    h4("Something went wrong"),
    p("Error code ", 404),
    p("Status ", "Not Found")
  );
};
