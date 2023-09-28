import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import spinner from "@grucloud/bau-ui/spinner";

import page from "../../components/page";
import workspaceList from "../../components/workspace/workspaceList";

export default function (context: Context) {
  const { bau, stores } = context;
  const { h1, header } = bau.tags;
  const { getAllByUserQuery } = stores.workspace;

  const Page = page(context);
  const Form = form(context);
  const Spinner = spinner(context, { size: "lg" });

  const WorkspaceList = workspaceList(context);

  return function WorkspaceUserPage({}: any) {
    getAllByUserQuery.run();

    return Page(
      Form(
        header(h1("Workspaces")),
        () =>
          !getAllByUserQuery.loading.val &&
          WorkspaceList(getAllByUserQuery.data.val)
      ),
      Spinner({
        visibility: getAllByUserQuery.loading,
      })
    );
  };
}
