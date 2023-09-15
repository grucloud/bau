import calendar from "@grucloud/bau-ui/calendar";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, options?: any) => {
  const Calendar = calendar(context, options);

  return (props: any) =>
    Calendar({
      ...props,
    });
};
