import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";
import button from "@grucloud/bau-ui/button";

export default function (context: Context) {
  const { bau, css, config } = context;
  const { h2, table, tr, td, th, section, a, div } = bau.tags;
  const TableContainer = tableContainer(context, {
    class: css`
      & th {
        text-align: left;
      }
    `,
  });

  const ButtonDelete = button(context, { variant: "outline", color: "danger" });

  return function WorkspaceDetailContent({
    org_id,
    project_id,
    workspace_id,
  }: any) {
    return section(
      h2("Summary"),
      TableContainer(
        table(
          tr(
            th("Organisation"),
            td(a({ href: `${config.base}/org/${org_id}` }, org_id))
          ),
          tr(
            th("Project"),
            td(
              a(
                { href: `${config.base}/org/${org_id}/projects/${project_id}` },
                project_id
              )
            )
          ),
          tr(th("Workspace"), td(workspace_id))
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
