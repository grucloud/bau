import input from "@grucloud/bau-ui/input";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, options: any = {}) => {
  const Input = input(context, options);
  const toName = ({ color, variant, size, options }: any) =>
    `myinput-gallery-${color ?? options.color}-${variant ?? options.variant}-${
      size ?? options.size
    }`;
  return ({ color, variant, size, ...props }: any) =>
    Input({
      "aria-label": toName({ color, variant, size, options }),
      name: toName({ color, variant, size, options }),
      placeholder: "Enter text",
      color,
      variant,
      size,
      ...props,
    });
};
