import calendar from "@grucloud/bau-ui/calendar";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const Calendar = calendar(context);

  return (props: any) =>
    Calendar({
      ...props,
    });
};
