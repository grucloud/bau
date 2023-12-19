import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, config } = context;
  const { li, a, span, label } = bau.tags;

  return function KvWorkspace({ org_id, project_id, workspace_id }: any) {
    console.assert(org_id);
    console.assert(project_id);
    console.assert(workspace_id);

    return li(
      label("Workspace"),
      span(
        a(
          {
            href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}`,
          },
          workspace_id
        )
      )
    );
  };
}
