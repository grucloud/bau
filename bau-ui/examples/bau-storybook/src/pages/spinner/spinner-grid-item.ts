import spinner from "@grucloud/bau-ui/spinner";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const Spinner = spinner(context);

  return (props: any) => Spinner({ ...props });
};
