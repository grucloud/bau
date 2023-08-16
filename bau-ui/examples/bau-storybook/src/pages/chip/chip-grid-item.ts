import chip from "@grucloud/bau-ui/chip";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;

  const Chip = chip(context);

  return (props: any) =>
    Chip(
      {
        ...props,
      },
      `Chip ${props.color} ${props.variant}`
    );
};
