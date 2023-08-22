import collapsible from "@grucloud/bau-ui/collapsible";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const Collapsible = collapsible(context);

  return (props: any) => Collapsible({ ...props }, "");
};
