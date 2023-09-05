import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";

export default function (context: Context) {
  const { bau, css } = context;
  const { table, thead, tbody, th, tr, td } = bau.tags;

  const TableContainer = tableContainer(context);

  const className = css``;

  return function ResourceTale(props: any) {
    return TableContainer(
      {
        class: className,
      },
      table(
        thead(tr(th("Resource Type"), th("Total"))),
        tbody(
          props.map(({ type, resources = [] }: any) =>
            tr(td(type), td(resources.length))
          )
        )
      )
    );
  };
}
