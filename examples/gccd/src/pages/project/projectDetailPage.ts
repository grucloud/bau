import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import spinner from "@grucloud/bau-ui/spinner";
import button from "@grucloud/bau-ui/button";

import page from "../../components/page";
import projectDetailContent from "../../components/project/projectDetailContent";
import workspaceList from "../../components/workspace/workspaceList";

export default function (context: Context) {
  const { bau, stores, config } = context;
  const { h1, h2, header } = bau.tags;
  const { getByIdQuery } = stores.project;

  const Page = page(context);
  const Form = form(context);
  const Spinner = spinner(context, { size: "lg" });
  const ButtonAddWorkspace = button(context, {
    color: "primary",
    variant: "solid",
  });
  const ButtonDelete = button(context, { variant: "outline", color: "danger" });

  const ProjectDetailContent = projectDetailContent(context);
  const WorkspaceList = workspaceList(context);

  return function ProjectDetailPage({ org_id, project_id }: any) {
    getByIdQuery.run({ org_id, project_id });
    stores.workspace.getAllByProject.run({ org_id, project_id });
    return Page(
      Form(
        header(
          h1("Project Details"),
          ButtonAddWorkspace(
            {
              href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/create`,
            },
            "+ New Workspace"
          )
        ),
        () =>
          !getByIdQuery.loading.val &&
          ProjectDetailContent(getByIdQuery.data.val),
        h2("Workspace"),
        () =>
          !stores.workspace.getAllByProject.loading.val &&
          WorkspaceList(stores.workspace.getAllByProject.data.val),
        h2("Danger Zone"),
        ButtonDelete(
          {
            href: `${config.base}/org/${org_id}/projects/${project_id}/destroy`,
          },
          "Danger Zone"
        )
      ),
      Spinner({
        visibility: getByIdQuery.loading,
      })
    );
  };
}
