import toggleGroup from "@grucloud/bau-ui/toggleGroup";
import toggle from "@grucloud/bau-ui/toggle";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, options?: any) => {
  const { bau } = context;

  const ToggleGroup = toggleGroup(context, options);
  const Toggle = toggle(context, options);

  return (props: any) => {
    const selectedState = bau.state([""]);

    const groups = [
      { value: "one", label: "ONE" },
      { value: "two", label: "TWO" },
      { value: "three", label: "THREE" },
    ];

    const onChange = ({ values }: any) => {
      selectedState.val = values;
    };

    return ToggleGroup(
      { ...props, onChange },
      groups.map(
        ({ label, value }) =>
          () =>
            Toggle(
              {
                ...props,
                value,
                selected: selectedState.val.includes(value),
                "area-label": label,
              },
              label
            )
      )
    );
  };
};
