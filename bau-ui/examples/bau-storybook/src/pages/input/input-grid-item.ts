import input from "@grucloud/bau-ui/input";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const Input = input(context);

  return (props: any) =>
    Input({
      name: `myinput-gallery-${props.color}-${props.variant}-${props.size}`,
      id: `myinput-gallery-${props.color}-${props.variant}-${props.size}`,
      placeholder: "Enter text",
      ...props,
    });
};
