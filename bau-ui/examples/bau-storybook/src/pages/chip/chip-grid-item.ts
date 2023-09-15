import chip from "@grucloud/bau-ui/chip";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, options: any) => {
  const Chip = chip(context, options);

  return (props: any) =>
    Chip(
      {
        ...props,
      },
      `Chip ${props.color} ${props.variant} ${props.size ?? ""}`
    );
};
