import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const Button = button(context);

  return (props: any) =>
    Button(
      {
        ...props,
      },
      `${props.variant} ${props.color} ${props.size}`
    );
};
