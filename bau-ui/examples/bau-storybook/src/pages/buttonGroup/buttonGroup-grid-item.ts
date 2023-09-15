import buttonGroup from "@grucloud/bau-ui/buttonGroup";
import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, options?: any) => {
  const groups = ["ONE", "TWO", "THREE"];

  const Button = button(context, options);
  const ButtonGroup = buttonGroup(context, options);

  return (props: any) =>
    ButtonGroup(
      { ...props },
      groups.map((group) => Button(props, group))
    );
};
