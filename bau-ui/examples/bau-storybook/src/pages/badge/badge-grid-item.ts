import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const Badge = badge(context);

  return (props: any, { index }: any) =>
    Badge({ ...props, content: `${index * 100}` }, "\u260F");
};
