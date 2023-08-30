import stepper from "@grucloud/bau-ui/stepper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;
  const Stepper = stepper(context);

  return (props: any) => section(Stepper({ ...props }));
};
