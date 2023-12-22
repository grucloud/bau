import calendar from "@grucloud/bau-ui/calendar";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, options?: any) => {
  const Calendar = calendar(context, options);

  const toName = ({ props = {}, options = {} }: any) =>
    `myinput-gallery-${props.color ?? options.color}-${
      props.variant ?? options.variant
    }-${props.size ?? options.size}`;

  return (props: any) =>
    Calendar({
      "aria-label": toName({ props, options }),
      ...props,
    });
};
