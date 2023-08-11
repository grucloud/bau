import alert from "@grucloud/bau-ui/alert";

import { Context } from "../context";
import componentGrid from "./componentGrid";

export default (context: Context) => {
  const { tr, bau } = context;
  const { section, div, h3, h2, h4, p } = bau.tags;

  const ComponentGrid = componentGrid(context);

  const Alert = alert(context);
  return () =>
    section(
      { id: "alert" },
      h2(tr("Alert Examples")),
      h3("Basic Alert"),
      div(
        Alert(
          {
            color: "danger",
          },
          h4("Something went wrong"),
          p("Error code ", 404),
          p("Status ", "Not Found")
        )
      ),
      h3("Alert Table"),
      ComponentGrid({
        Item: (props: any) => Alert({ ...props }, `Alert ${props.color}`),
      })
    );
};
