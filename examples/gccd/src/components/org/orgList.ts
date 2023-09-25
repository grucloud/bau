import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";

export default function (context: Context) {
  const { bau, css, stores } = context;
  const { span, a, table, tr, td } = bau.tags;
  const TableContainer = tableContainer(context, {
    class: css``,
  });

  const ListItem = ({ org_id, name }: any) =>
    tr(
      {
        "data-org-list-item-name": name,
      },
      td(
        a(
          {
            href: `org/${org_id}`,
            class: css`
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 1rem;
              color: var(--font-color);
            `,
          },
          span(name)
        )
      )
    );

  const { data } = stores.org.getAllQuery;

  return function OrgList({}) {
    return () =>
      data.val
        ? TableContainer(table(data.val.map(ListItem)))
        : "No organisation";
  };
}
