import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import spinner from "@grucloud/bau-ui/spinner";
//import button from "@grucloud/bau-ui/button";

import page from "../../components/page";
import projectList from "../../components/project/projectList";

export default function (context: Context) {
  const { bau, stores } = context;
  const { h1, header } = bau.tags;
  const { getAllByUserQuery } = stores.project;

  const Page = page(context);
  const Form = form(context);
  const Spinner = spinner(context, { size: "lg" });
  // const ButtonAddWorkspace = button(context, {
  //   color: "primary",
  //   variant: "solid",
  // });

  const WorkspaceList = projectList(context);

  return function WorkspaceUserPage({}: any) {
    getAllByUserQuery.run();

    return Page(
      Form(
        header(
          h1("Projects")
          // ButtonAddWorkspace(
          //   {
          //     href: `${project_id}/runs/create`,
          //   },
          //   "+ New Run"
          // )
        ),
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
