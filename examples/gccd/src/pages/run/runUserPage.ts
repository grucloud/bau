import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";

import page from "../../components/page";
import runList from "../../components/run/runList";

export default function (context: Context) {
  const { bau, stores } = context;
  const { h1, header } = bau.tags;
  const { getAllByUserQuery } = stores.run;

  const Page = page(context);
  const Form = form(context);

  const RunList = runList(context);

  return function RunUserPage({}: any) {
    getAllByUserQuery.run();

    return Page(Form(header(h1("All Runs")), RunList(getAllByUserQuery)));
  };
}
