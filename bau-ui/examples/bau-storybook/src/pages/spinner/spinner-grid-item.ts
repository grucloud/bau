import spinner from "@grucloud/bau-ui/spinner";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, options: any) => {
  const Spinner = spinner(context, options);

  return (props: any) => Spinner({ ...props });
};
