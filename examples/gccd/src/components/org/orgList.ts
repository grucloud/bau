import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";
import tableSkeleton from "../tableSkeleton";
import alert from "@grucloud/bau-ui/alert";
import button from "@grucloud/bau-ui/button";

export default function (context: Context) {
  const { bau, css, config } = context;
  const { h1, p, span, a, table, thead, tbody, tfooter, th, tr, td } = bau.tags;
  const Alert = alert(context, {
    color: "primary",
  });
  const TableSkeleton = tableSkeleton(context);
  const TableContainer = tableContainer(context, {
    class: css``,
  });
  const ButtonAdd = button(context, { color: "primary", variant: "solid" });

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

  const NoOrg = () =>
    tfooter(
      Alert(
        {
          class: css`
            margin: 1rem;
          `,
        },
        h1("No organisation"),
        p("An organisation is a container for projects."),
        p(
          ButtonAdd(
            {
              href: `${config.base}/org/create`,
            },
            "Create Organisation"
          )
        )
      )
    );

  const headers = ["Organisation", "Projects"];

  return function OrgList({ data, loading }: any) {
    return TableContainer(
      table(
        thead(headers.map((header) => th({ scope: "col" }, header))),
        () => {
          if (loading.val) {
            return TableSkeleton({ columnsSize: 2, rowSize: 1 });
          } else if (data.val.length) {
            return tbody(data.val.map(ListItem));
          }
          return NoOrg();
        }
      )
    );
  };
}
