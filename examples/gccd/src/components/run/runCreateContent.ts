import { type Context } from "@grucloud/bau-ui/context";
import input from "@grucloud/bau-ui/input";
import radioButton from "@grucloud/bau-ui/radioButton";

export default function (context: Context) {
  const { bau, css } = context;
  const { section, label, fieldset, legend } = bau.tags;
  const Input = input(context);
  const RadioButton = radioButton(context);

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
          & label {
            flex-direction: row;
          }
        `,
      },
      legend("Kind"),
      label(
        "Inventory",
        RadioButton({
          id: "list",
          name: "kind",
          checked: true,
          value: checkedGitProviderState,
          oninput,
        })
      ),
      label(
        "Plan",
        RadioButton({
          id: "plan",
          name: "kind",
          value: checkedGitProviderState,
          oninput,
        })
      ),
      label(
        "Apply",
        RadioButton({
          id: "apply",
          name: "kind",
          value: checkedGitProviderState,
          oninput,
        })
      ),
      label(
        "Destroy",
        RadioButton({
          id: "destroy",
          name: "kind",
          value: checkedGitProviderState,
          oninput,
        })
      )
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
