import { type Context } from "@grucloud/bau-ui/context";
import input from "@grucloud/bau-ui/input";
import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";

export default function (context: Context) {
  const { bau, css } = context;
  const { section, label, fieldset, legend } = bau.tags;
  const Input = input(context);
  const RadioButtonGroup = radioButtonGroup(context);

  const checkedGitProviderState = bau.state("list");
  const oninput = (event: any) => {
    checkedGitProviderState.val = event.target.id;
  };

  const RunKind = () =>
    fieldset(
      {
        class: css`
          display: inline-flex;
          flex-direction: row;
          gap: 1rem;
          border: 1px solid var(--color-emphasis-500);
        `,
      },
      legend("Kind"),
      RadioButtonGroup({
        oninput,
        name: "kind",
        value: checkedGitProviderState.val,
        radios: [
          { id: "list", Label: () => "Inventory" },
          { id: "plan", Label: () => "Plan" },
          { id: "apply", Label: () => "Apply" },
          { id: "destroy", Label: () => "Destroy" },
        ],
      })
    );

  return function RunCreateContent({}) {
    return section(
      RunKind(),
      label(
        "Reason",
        Input({
          autofocus: true,
          placeholder: "Reason",
          name: "reason",
          minLength: 1,
          maxLength: 24,
        })
      )
    );
  };
}
