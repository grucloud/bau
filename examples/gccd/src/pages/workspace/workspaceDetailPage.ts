import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import button from "@grucloud/bau-ui/button";
import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";
import tabs, { Tabs } from "@grucloud/bau-ui/tabs";

import page from "../../components/page";
import workspaceDetailContent from "../../components/workspace/workspaceDetailContent";
import runList from "../../components/run/runList";
import cloudAuthenticationList from "../../components/cloudAuthentication/cloudAuthenticationList";

export default function (context: Context) {
  const { bau, stores, config, css } = context;
  const { div, h2, header, a, section } = bau.tags;
  const { getByIdQuery } = stores.workspace;
  const DropdownMenu = dropdownMenu(context);

  const Page = page(context);
  const Form = form(context);
  const ButtonAdd = button(context, {
    color: "primary",
    variant: "solid",
  });

  const WorkspaceDetailContent = workspaceDetailContent(context);
  const RunList = runList(context);
  const CloudAuthenticationList = cloudAuthenticationList(context);

  return function WorkspaceDetailPage(props: any) {
    const { org_id, project_id, workspace_id } = props;

    getByIdQuery.run({ org_id, project_id, workspace_id });
    stores.run.getAllByWorkspaceQuery.run({ org_id, project_id, workspace_id });
    stores.cloudAuthentication.getAllByWorkspaceQuery.run({
      org_id,
      project_id,
      workspace_id,
    });

    const tabDefs: Tabs = [
      {
        name: "summary",
        Header: () => "Workspace Summary",
        Content: () =>
          section(header(), () => WorkspaceDetailContent(getByIdQuery)),
      },
      {
        name: "runs",
        Header: () => "Runs",
        Content: () =>
          section(
            div(
              ButtonAdd(
                {
                  href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}/runs/create`,
                },
                "+ New Run"
              )
            ),
            RunList(stores.run.getAllByWorkspaceQuery)
          ),
      },
      {
        name: "cloudAuthentication",
        Header: () => "Cloud Authentication",
        Content: () =>
          section(
            h2("Cloud Authentication"),
            DropdownMenu({
              items,
              ListItem,
              label: "+ Add",
            }),
            () =>
              CloudAuthenticationList(
                stores.cloudAuthentication.getAllByWorkspaceQuery
              )
          ),
      },
    ];

    const Tabs = tabs(context, { tabDefs, variant: "plain", color: "neutral" });

    const items = [
      {
        href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}/cloud_authentication/create/aws`,
        text: "AWS",
      },
      {
        href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}/cloud_authentication/create/azure`,
        text: "Azure",
      },
      {
        href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}/cloud_authentication/create/google`,
        text: "Google",
      },
    ];

    const ListItem = (option: any) =>
      a(
        {
          href: option.href,
          class: css`
            text-decoration: none;
            color: inherit;
          `,
        },
        option.text
      );

    return Page(Form(Tabs(props)));
  };
}
