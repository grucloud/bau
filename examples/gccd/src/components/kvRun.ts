import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, config } = context;
  const { li, a, span, label } = bau.tags;

  return function KvRun({ org_id, project_id, workspace_id, run_id }: any) {
    console.assert(org_id);
    console.assert(project_id);
    console.assert(workspace_id);
    console.assert(run_id);

    return li(
      label("Run"),
      span(
        a(
          {
            href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}/runs/${run_id}`,
          },
          run_id
        )
      )
    );
  };
}
