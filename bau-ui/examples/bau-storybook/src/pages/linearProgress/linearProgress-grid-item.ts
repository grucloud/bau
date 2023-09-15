import linearProgress from "@grucloud/bau-ui/linearProgress";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, options: any) => {
  const LinearProgress = linearProgress(context, options);

  return (props: any) => LinearProgress({ ...props, running: true });
};
