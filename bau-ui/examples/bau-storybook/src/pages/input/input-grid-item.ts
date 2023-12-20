import input from "@grucloud/bau-ui/input";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, options: any = {}) => {
  const Input = input(context, options);
  return ({ color, variant, size, ...props }: any) =>
    Input({
      name: `myinput-gallery-${color ?? options.color}-${
        variant ?? options.variant
      }-${size ?? options.size}`,
      placeholder: "Enter text",
      color,
      variant,
      size,
      ...props,
    });
};
