import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, config } = context;
  const { li, a, span, label } = bau.tags;

  return function KvOrg({ org_id }: any) {
    console.assert(org_id);
    return li(
      label("Organisation"),
      span(a({ href: `${config.base}/org/${org_id}` }, org_id))
    );
  };
}
