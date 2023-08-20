import alert from "@grucloud/bau-ui/alert";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const Alert = alert(context);
  return (props: any) =>
    Alert({ ...props }, `Alert ${props.variant} ${props.color}`);
};
