import linearProgress from "@grucloud/bau-ui/linearProgress";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const LinearProgress = linearProgress(context);

  return (props: any) => LinearProgress({ ...props, running: true });
};
