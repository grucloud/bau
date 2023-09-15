import alert from "@grucloud/bau-ui/alert";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, options?: any) => {
  const Alert = alert(context, options);
  return (props: any) => Alert({ ...props }, `Alert ${options?.size ?? ""} `);
};
