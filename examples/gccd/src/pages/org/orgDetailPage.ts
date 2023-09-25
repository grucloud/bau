import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import spinner from "@grucloud/bau-ui/spinner";

import page from "../../components/page";
import orgDetailContent from "../../components/org/orgDetailContent";

export default function (context: Context) {
  const { bau, stores } = context;
  const { h1, header } = bau.tags;
  const { getByIdQuery } = stores.org;

  const Page = page(context);
  const Form = form(context);
  const Spinner = spinner(context, { size: "lg" });

  const OrgDetailContent = orgDetailContent(context);

  return function OrgDetailPage({ org_id }: any) {
    getByIdQuery.run(org_id);

    return Page(
      Form(
        header(h1("Organisation Details")),
        () =>
          !getByIdQuery.loading.val && OrgDetailContent(getByIdQuery.data.val)
      ),
      Spinner({
        visibility: getByIdQuery.loading,
      })
    );
  };
}
