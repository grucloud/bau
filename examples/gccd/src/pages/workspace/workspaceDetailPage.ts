import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import button from "@grucloud/bau-ui/button";
import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";
import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
import keyValueList from "@grucloud/bau-ui/keyValueList";
import kvOrg from "../../components/kvOrg";
import kvProject from "../../components/kvProject";
import kvWorkspace from "../../components/kvWorkspace";

import workspaceDetailContent from "../../components/workspace/workspaceDetailContent";
import runList from "../../components/run/runList";
import cloudAuthenticationList from "../../components/cloudAuthentication/cloudAuthenticationList";

export default function (context: Context) {
  const { bau, stores, config, css } = context;
  const { h2, p, header, a, section, strong } = bau.tags;
  const { getByIdQuery } = stores.workspace;
  const KeyValueList = keyValueList(context, {
    class: css`
      &.keyValueList {
        flex-direction: row;
        gap: 1rem;
      }
    `,
  });

  const KvOrg = kvOrg(context);
  const KvProject = kvProject(context);
  const KvWorkspace = kvWorkspace(context);
  const DropdownMenu = dropdownMenu(context);
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
        name: "runs",
        Header: () => "Runs",
        Content: () => section(RunList(stores.run.getAllByWorkspaceQuery)),
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
      {
        name: "summary",
        Header: () => "Workspace Details",
        Content: () =>
          section(header(), () => WorkspaceDetailContent(getByIdQuery)),
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

    return Form(
      h2("Workspace"),
      KeyValueList(
        KvOrg({ org_id }),
        KvProject({ org_id, project_id }),
        KvWorkspace({ org_id, project_id, workspace_id })
      ),
      p(
        ButtonAdd(
          {
            href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}/runs/create`,
          },
          "+ New Run"
        )
      ),
      Tabs(props)
    );
  };
}
