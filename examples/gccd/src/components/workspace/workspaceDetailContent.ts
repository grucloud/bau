import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";

export default function (context: Context) {
  const { bau, css, config } = context;
  const { h2, table, tr, td, th, section, a } = bau.tags;
  const TableContainer = tableContainer(context, {
    class: css`
      & th {
        text-align: left;
      }
    `,
  });
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
      )
    );
  };
}
