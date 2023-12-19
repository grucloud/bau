import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, config } = context;
  const { li, a, span, label } = bau.tags;

  return function KvProject({ org_id, project_id }: any) {
    console.assert(org_id);
    console.assert(project_id);

    return li(
      label("Project"),
      span(
        a(
          {
            href: `${config.base}/org/${org_id}/projects/${project_id}`,
          },
          project_id
        )
      )
    );
  };
}
