import input from "@grucloud/bau-ui/input";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, options: any = {}) => {
  const Input = input(context, options);

  return (props: any) =>
    Input({
      name: `myinput-gallery-${options.color}-${options.variant}-${options.size}`,
      id: `myinput-gallery-${options.color}-${options.variant}-${options.size}`,
      placeholder: "Enter text",
      ...props,
    });
};
