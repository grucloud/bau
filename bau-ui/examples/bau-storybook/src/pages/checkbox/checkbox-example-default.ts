import checkbox from "@grucloud/bau-ui/checkbox";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, label } = bau.tags;

  const Checkbox = checkbox(context);

  const checkboxState = bau.state(false);

  const onChange = (event: any) => {
    checkboxState.val = event.target.checked ? true : false;
  };

  return section(
    label(
      {
        class: css`
          display: inline-flex;
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          gap: 1rem;
        `,
      },
      "My Checkbox",
      Checkbox({
        color: "neutral",
        variant: "outline",
        id: "my-checkbox",
        name: "myCheckbox",
        checked: checkboxState,
        onchange: onChange,
      })
    )
  );
};
