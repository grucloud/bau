import loadingButton from "@grucloud/bau-ui/loadingButton";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, options?: any) => {
  const LoadingButton = loadingButton(context, options);

  return (props: any) => LoadingButton({ ...props, loading: true }, "Save");
};
