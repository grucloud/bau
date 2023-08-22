import collapsible from "@grucloud/bau-ui/collapsible";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Collapsible = collapsible(context);

  return () => section(Collapsible({}, "Collapsible"));
};
