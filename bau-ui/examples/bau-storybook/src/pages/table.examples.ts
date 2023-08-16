import tableContainer from "@grucloud/bau-ui/tableContainer";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div, h3, h2, th, td, tr, table, thead, tbody, caption } =
    bau.tags;

  // @ts-ignore
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows: any = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const Container = (...children: any[]) =>
    div(
      {
        class: css`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `,
      },
      ...children
    );

  const Row = ({ name, calories }: any) =>
    tr(
      td(name),
      td(
        {
          class: css`
            text-align: right;
          `,
        },
        calories
      )
    );

  const TableHeader = () =>
    thead(
      tr(
        th(
          {
            class: css`
              text-align: left;
            `,
            title: "Product Name",
          },
          "Product Name"
        ),
        th(
          {
            class: css`
              text-align: right;
            `,
            title: "Calories",
          },
          "Calories"
        )
      )
    );

  const TableSimple = tableContainer(context, {
    class: css`
      max-width: 650px;
    `,
  });

  const TableDense = tableContainer(context, {
    class: css`
      & td,
      th {
        padding: 0.4rem;
      }
    `,
  });

  const TableZebra = tableContainer(context, {
    class: css`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `,
  });

  const TableCaptionBottom = tableContainer(context, {
    class: css`
      & caption {
        border-top: 1px solid var(--table-border-color);
        caption-side: bottom;
      }
    `,
  });

  const TableOverflowHeader = tableContainer(context, {
    class: css`
      & table {
        width: 60px;
        & th {
          max-width: 40px;
        }
      }
    `,
  });
  return () =>
    section(
      { id: "table" },
      h2(tr("Table")),
      h3("Basic Table"),
      Container(
        TableSimple(
          table(caption("Basic Table"), TableHeader(), tbody(rows.map(Row)))
        )
      ),
      h3("Dense Table"),
      Container(
        TableDense(
          table(caption("Dense Table"), TableHeader(), tbody(rows.map(Row)))
        )
      ),
      h3("Zebra Table"),
      Container(
        TableZebra(
          table(caption("Zebra Table"), TableHeader(), tbody(rows.map(Row)))
        )
      ),
      h3("Caption Bottom"),
      Container(
        TableCaptionBottom(
          table(
            caption("Caption Bottom Table"),
            TableHeader(),
            tbody(rows.map(Row))
          )
        )
      ),
      h3("Overflow Header"),
      Container(
        TableOverflowHeader(
          table(caption("Overflow Header"), TableHeader(), tbody(rows.map(Row)))
        )
      )
    );
};
