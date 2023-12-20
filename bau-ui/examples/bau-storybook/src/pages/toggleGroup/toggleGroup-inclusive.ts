import { Context } from "@grucloud/bau-ui/context";
import toggleGroup from "@grucloud/bau-ui/toggleGroup";
import toggle from "@grucloud/bau-ui/toggle";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau } = context;
  const { form, article, footer } = bau.tags;

  const selectedState = bau.state([""]);

  const groups = [
    { value: "one", label: "ONE" },
    { value: "two", label: "TWO" },
    { value: "three", label: "THREE" },
  ];

  const color = "primary";
  const variant = "solid";

  const Toggle = toggle(context, { variant, color });
  const ToggleGroup = toggleGroup(context, { variant, color });
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const onChange = ({ values }: any) => {
    selectedState.val = values;
  };

  const onsubmit = (event: any) => {
    event.preventDefault();
    const formEl = event.target.closest("form");
    const buttonNames = [
      ...formEl.querySelectorAll("button[aria-pressed=true]"),
    ].map(({ name }: any) => name);
    alert(JSON.stringify(buttonNames));
  };

  return () =>
    form(
      { onsubmit },
      article(
        ToggleGroup(
          { onChange },
          groups.map(
            ({ label, value }) =>
              () =>
                Toggle(
                  {
                    value,
                    name: label,
                    selected: selectedState.val.includes(value),
                  },
                  label
                )
          )
        )
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
