import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";

export default function (context: Context) {
  const { bau, css } = context;
  const { span, a, table, tr, td, section } = bau.tags;
  const TableContainer = tableContainer(context, {
    class: css`
      & th {
        text-align: left;
      }
    `,
  });

  const ListItem = ({ workspace_id, run_id }: any) =>
    tr(
      {
        "data-run-list-item-name": run_id,
      },
      td(
        a(
          {
            href: `${workspace_id}/runs/${run_id}`,
            class: css`
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 1rem;
              color: var(--font-color);
            `,
          },
          span(run_id)
        )
      )
    );

  return function RunList(runs: any) {
    return section(TableContainer(table(runs.map(ListItem))));
  };
}
