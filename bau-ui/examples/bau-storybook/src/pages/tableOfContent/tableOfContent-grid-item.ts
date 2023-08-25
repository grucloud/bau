import tableOfContent from "@grucloud/bau-ui/tableOfContent";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;
  const TableOfContent = tableOfContent(context);

  return (props: any) => section(TableOfContent({ ...props }));
};
