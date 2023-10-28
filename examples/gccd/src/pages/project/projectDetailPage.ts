import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import tabs, { Tabs } from "@grucloud/bau-ui/tabs";

import page from "../../components/page";
import projectDetailContent from "../../components/project/projectDetailContent";
import workspaceList from "../../components/workspace/workspaceList";

export default function (context: Context) {
  const { bau, stores, config } = context;
  const { h1, h2, div, a, p, strong } = bau.tags;
  const { getByIdQuery } = stores.project;

  const Page = page(context);
  const ButtonAddWorkspace = button(context, {
    color: "primary",
    variant: "solid",
  });
  const ButtonDelete = button(context, { variant: "outline", color: "danger" });

  const ProjectDetailContent = projectDetailContent(context);
  const WorkspaceList = workspaceList(context);

  return function ProjectDetailPage(props: any) {
    const { org_id, project_id } = props;
    getByIdQuery.run({ org_id, project_id });
    stores.workspace.getAllByProject.run({ org_id, project_id });

    const tabDefs: Tabs = [
      {
        name: "workspaces",
        Header: () => a({ href: "#workspace" }, "Workspaces"),
        Content: () =>
          div(
            div(
              ButtonAddWorkspace(
                {
                  href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/create`,
                },
                "+ New Workspace"
              ),
              div(() => WorkspaceList(stores.workspace.getAllByProject))
            )
          ),
      },
      {
        name: "summary",
        Header: () => a({ href: "#summary" }, "Project Summary"),
        Content: () =>
          div(
            ProjectDetailContent(getByIdQuery),
            h2("Danger Zone"),
            ButtonDelete(
              {
                href: `${config.base}/org/${org_id}/projects/${project_id}/destroy`,
              },
              "Danger Zone"
            )
          ),
      },
    ];

    const Tabs = tabs(context, { tabDefs, variant: "plain", color: "neutral" });

    return Page(
      h1("Project Details"),
      p(
        "Project ",
        strong(project_id),
        " in organisation ",
        a({ href: `${config.base}/org/${org_id}` }, org_id)
      ),
      Tabs(props)
    );
  };
}
