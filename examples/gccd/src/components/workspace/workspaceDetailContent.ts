import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";
import button from "@grucloud/bau-ui/button";
import tableSkeleton from "../tableSkeleton";

export default function (context: Context) {
  const { bau, css, config } = context;
  const { h2, table, tr, td, th, section, a, div, tbody } = bau.tags;
  const TableContainer = tableContainer(context, {
    class: css`
      & th {
        text-align: left;
      }
    `,
  });
  const TableSkeleton = tableSkeleton(context);

  const ButtonDelete = button(context, { variant: "outline", color: "danger" });

  return function WorkspaceDetailContent({ data, loading }: any) {
    const { org_id, project_id, workspace_id } = data.val;
    return section(
      TableContainer(
        table(() =>
          loading.val
            ? TableSkeleton({ columnsSize: 2, rowSize: 3 })
            : tbody(
                tr(
                  th("Organisation"),
                  td(a({ href: `${config.base}/org/${org_id}` }, org_id))
                ),
                tr(
                  th("Project"),
                  td(
                    a(
                      {
                        href: `${config.base}/org/${org_id}/projects/${project_id}`,
                      },
                      project_id
                    )
                  )
                ),
                tr(th("Workspace"), td(workspace_id))
              )
        )
      ),
      h2("Danger Zone"),
      div(
        ButtonDelete(
          {
            href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}/destroy`,
          },
          "Danger Zone"
        )
      )
    );
  };
}
