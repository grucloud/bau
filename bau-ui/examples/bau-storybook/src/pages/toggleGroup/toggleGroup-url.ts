import { Context } from "@grucloud/bau-ui/context";
import toggleGroup from "@grucloud/bau-ui/toggleGroup";
import toggle from "@grucloud/bau-ui/toggle";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, window } = context;
  const { form, footer, article } = bau.tags;

  const toggleGroupName = "my-toggle-group";
  const groups = [
    { value: "one", label: "ONE" },
    { value: "two", label: "TWO" },
    { value: "three", label: "THREE" },
  ];

  const color = "primary";
  const variant = "solid";

  const Toggle = toggle(context, { color, variant });
  const ToggleGroup = toggleGroup(context, { color, variant });
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  return () => {
    const search = new URLSearchParams(window.location.search);

    const selectedState = bau.state([...search.getAll(toggleGroupName)]);

    const onChange = ({ values }: any) => {
      selectedState.val = values;
      const search = new URLSearchParams(window.location.search);
      search.delete(toggleGroupName);
      values.forEach((value: string) => search.append(toggleGroupName, value));
      window.history.replaceState(
        "",
        "",
        `?${search.toString()}${window.location.hash}`
      );
    };

    const onsubmit = (event: any) => {
      event.preventDefault();
      const search = new URLSearchParams(window.location.search);
      alert(search.getAll(toggleGroupName));
    };

    return form(
      { onsubmit },
      article(
        ToggleGroup(
          { name: toggleGroupName, exclusive: true, onChange },
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
};
