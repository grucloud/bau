import input from "./input";

export default (context) => {
  const { tr, bau } = context;
  const { section, div, h3, h2 } = bau.tags;
  const Input = input(context);
  return () =>
    section(
      { id: "input" },
      h2(tr("Input Examples")),
      h3("Standard"),
      div(Input({ id: "my-Input", label: "my Input" })),
      h3("Disabled"),
      div(
        Input({
          id: "my-input-disabled",
          label: "my Input disabled",
          disabled: true,
        }),
        Input({
          id: "my-input-disabled-value",
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
