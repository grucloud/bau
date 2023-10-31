import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";
import tableSkeleton from "../tableSkeleton";

export default function (context: Context) {
  const { bau, css } = context;
  const { h2, table, tr, td, th, section } = bau.tags;
  const TableSkeleton = tableSkeleton(context);

  const TableContainer = tableContainer(context, {
    class: css`
      & th {
        text-align: left;
      }
    `,
  });

  return function OrgDetailContent({ data, loading }: any) {
    return section(h2("Summary"), () =>
      TableContainer(
        table(
          loading.val
            ? TableSkeleton({ columnsSize: 2, rowSize: 1 })
            : tr(th("Organisation Id"), td(data.val.org_id))
        )
      )
    );
  };
}
