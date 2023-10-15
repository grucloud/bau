import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";
import tableSkeleton from "../tableSkeleton";

export default function (context: Context) {
  const { bau, css } = context;
  const { span, a, table, thead, tbody, th, tr, td } = bau.tags;

  const TableSkeleton = tableSkeleton(context);
  const TableContainer = tableContainer(context, {
    class: css``,
  });

  const ListItem = ({ org_id, project_count }: any) =>
    tr(
      {
        "data-org-list-item-name": org_id,
      },
      td(
        a(
          {
            href: `org/${org_id}`,
          },
          span(org_id)
        )
      ),
      td(project_count)
    );

  const headers = ["Organisation", "Projects"];

  return function OrgList({ data, loading }: any) {
    return TableContainer(
      table(thead(headers.map((header) => th({ scope: "col" }, header))), () =>
        loading.val
          ? TableSkeleton({ columnsSize: 2, rowSize: 1 })
          : tbody(data.val.map(ListItem))
      )
    );
  };
}
