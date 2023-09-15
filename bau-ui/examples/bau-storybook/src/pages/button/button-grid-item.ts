import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, options: any = {}) => {
  const Button = button(context, options);

  return (props: any) =>
    Button(
      {
        ...props,
      },
      `${props.variant} ${props.color} ${options.size ?? ""}`
    );
};
