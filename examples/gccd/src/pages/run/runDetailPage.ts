import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";

import page from "../../components/page";
import runTabs from "../../components/run/runTabs";

export default function (context: Context) {
  const { bau, stores } = context;
  const { h1, header } = bau.tags;
  const { getByIdQuery } = stores.run;

  const Page = page(context);
  const Form = form(context);
  const RunTabs = runTabs(context);

  return function RunDetailPage({
    org_id,
    project_id,
    workspace_id,
    run_id,
  }: any) {
    getByIdQuery.run({ org_id, project_id, workspace_id, run_id });

    return Page(Form(header(h1("Run Details")), RunTabs(getByIdQuery)));
  };
}
