import input from "@grucloud/bau-ui/input";
import { Context } from "../context";

export default (context: Context) => {
  const { tr, bau } = context;
  const { section, div, h3, h2 } = bau.tags;
  const Input = input(context);
  return () =>
    section(
      { id: "input" },
      h2(tr("Input Examples")),
      h3("Standard"),
      div(Input({ id: "my-Input", name: "Label", label: "Label" })),
      h3("Disabled"),
      div(
        Input({
          id: "my-input-disabled",
          name: "my-input-disabled",
          label: "my Input disabled",
          disabled: true,
          // onclick: (event)=> {}
        }),
        Input({
          id: "my-input-disabled-value",
          name: "my-input-disabled-value",
          label: "my input disabled",
          disabled: true,
          value: "with value",
        })
      ),
      h3("Input with error"),
      div(
        Input({
          name: "my-input-error",
          id: "my-input-with-error",
          label: "my-input",
          error: "should be greater than 2",
        })
      )
    );
};
