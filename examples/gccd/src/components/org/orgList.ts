import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";

export default function (context: Context) {
  const { bau, css, stores } = context;
  const { span, a, table, thead, tbody, th, tr, td } = bau.tags;
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
            class: css`
              color: var(--font-color);
            `,
          },
          span(org_id)
        )
      ),
      td(project_count)
    );

  const { data } = stores.org.getAllQuery;

  return function OrgList({}) {
    return TableContainer(
      table(
        thead(th("Organisation"), th("Projects")),
        tbody(data.val.map(ListItem))
      )
    );
  };
}
