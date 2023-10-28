import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";
import tableSkeleton from "../tableSkeleton";

export default function (context: Context) {
  const { bau, css } = context;
  const { h2, table, tr, td, th, section, tbody } = bau.tags;

  const TableSkeleton = tableSkeleton(context);

  const TableContainer = tableContainer(context, {
    class: css`
      & th {
        text-align: left;
      }
    `,
  });

  return function ProjectDetailContent({ data, loading }: any) {
    const { project_id, org_id } = data.val;
    return section(
      h2("Summary"),
      TableContainer(
        table(() =>
          loading.val
            ? TableSkeleton({ columnsSize: 2, rowSize: 2 })
            : tbody(
                tr(th("Organisation"), td(org_id)),
                tr(th("Project"), td(project_id))
              )
        )
      )
    );
  };
}
