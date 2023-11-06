import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import tabs, { Tabs } from "@grucloud/bau-ui/tabs";

import page from "../../components/page";
import projectDetailContent from "../../components/project/projectDetailContent";
import workspaceList from "../../components/workspace/workspaceList";
import gitConfig from "../../components/git/gitConfig";
import tabsSkeleton from "../../components/tabsSkeleton";

export default function (context: Context) {
  const { bau, stores, config, css } = context;
  const { h1, h2, div, a, p, strong, section } = bau.tags;
  const { getByIdQuery } = stores.project;

  const Page = page(context);
  const ButtonAddWorkspace = button(context, {
    color: "primary",
    variant: "solid",
  });
  const ButtonDelete = button(context, { variant: "outline", color: "danger" });
  const TabsSkeleton = tabsSkeleton(context);
  const ProjectDetailContent = projectDetailContent(context);
  const WorkspaceList = workspaceList(context);
  const GitConfig = gitConfig(context);

  return function ProjectDetailPage(props: any) {
    const { org_id, project_id } = props;
    getByIdQuery.run({ org_id, project_id });
    stores.workspace.getAllByProject.run({ org_id, project_id });

    const tabDefs: Tabs = [
      {
        name: "workspaces",
        Header: () => "Workspaces",
        Content: () =>
          section(
            {
              class: css`
                margin-top: 1rem;
              `,
            },
            ButtonAddWorkspace(
              {
                href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/create`,
              },
              "+ New Workspace"
            ),
            div(() => WorkspaceList(stores.workspace.getAllByProject))
          ),
      },
      {
        name: "git",
        Header: () => "Source Code",
        Content: ({}: any) =>
          GitConfig({
            edit: true,
            ...getByIdQuery.data.val,
            onSubmitted: () => {},
          }),
      },
      {
        name: "summary",
        Header: () => "Project Summary",
        Content: () =>
          section(
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
      bau.bind({
        deps: [getByIdQuery.loading],
        render: () => (loading) =>
          loading ? TabsSkeleton({ columnsSize: 3 }) : Tabs(props),
      })
    );
  };
}
