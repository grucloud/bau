import buttonGroup from "@grucloud/bau-ui/buttonGroup";
import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const groups = ["ONE", "TWO", "THREE"];

  const color = "primary";
  const variant = "solid";

  const Button = button(context, { color, variant });
  const ButtonGroup = buttonGroup(context, { color, variant });

  const onClick = (group: string) => (_event: any) => {
    alert(group);
  };

  return () =>
    section(
      ButtonGroup(
        groups.map((group) => Button({ onclick: onClick(group) }, group))
      )
    );
};
