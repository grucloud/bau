import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, options: any) => {
  const { bau } = context;
  const { div } = bau.tags;
  const Paper = paper(context, options);

  return (props: any) =>
    Paper(
      {
        ...props,
      },
      div(`Paper ${options.size ?? ""}`)
    );
};
