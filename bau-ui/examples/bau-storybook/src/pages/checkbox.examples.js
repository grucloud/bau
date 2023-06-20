import checkbox from "@grucloud/bau-ui/checkbox/checkbox";

export default (context) => {
  const { tr, bau, css } = context;
  const { section, div, label, h2, form } = bau.tags;

  const Checkbox = checkbox(context);

  const checkboxState = bau.state(false);
  const checkboxDisabledState = bau.state(false);

  const onChange = (state) => (event) => {
    state.val = event.target.checked ? true : false;
  };

  const CheckboxContainer = (...children) =>
    div(
      {
        class: css`
          display: flex;
          align-items: center;
          label {
            margin-left: 1rem;
          }
        `,
      },
      ...children
    );

  return () =>
    section(
      { id: "checkbox" },
      form(
        h2(tr("Checkbox Examples")),
        CheckboxContainer(
          Checkbox({
            id: "myCheckbox",
            name: "myCheckbox",
            checked: checkboxState,
            onchange: onChange(checkboxState),
          }),
          label({ for: "myCheckbox" }, "My Checkbox")
        ),
        CheckboxContainer(
          Checkbox({
            id: "myCheckbox-disabled",
            disabled: true,
            name: "myCheckbox-disabled",
            checked: checkboxDisabledState,
            onchange: onChange(checkboxDisabledState),
          }),
          label({ for: "myCheckbox-disabled" }, "My Disabled Checkbox")
        )
      )
    );
};
