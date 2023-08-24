import loadingButton from "@grucloud/bau-ui/loadingButton";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const LoadingButton = loadingButton(context);

  return (props: any) => LoadingButton({ ...props, loading: true }, "Save");
};
