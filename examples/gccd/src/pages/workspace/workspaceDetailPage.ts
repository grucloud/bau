import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import spinner from "@grucloud/bau-ui/spinner";
import button from "@grucloud/bau-ui/button";
import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";

import page from "../../components/page";
import workspaceDetailContent from "../../components/workspace/workspaceDetailContent";
import runList from "../../components/run/runList";
import cloudAuthenticationList from "../../components/cloudAuthentication/cloudAuthenticationList";

export default function (context: Context) {
  const { bau, stores, config, css } = context;
  const { h1, h2, header, a } = bau.tags;
  const { getByIdQuery } = stores.workspace;
  const DropdownMenu = dropdownMenu(context);

  const Page = page(context);
  const Form = form(context);
  const Spinner = spinner(context, { size: "lg" });
  const ButtonAddWorkspace = button(context, {
    color: "primary",
    variant: "solid",
  });
  const ButtonDelete = button(context, { variant: "outline", color: "danger" });

  const WorkspaceDetailContent = workspaceDetailContent(context);
  const RunList = runList(context);
  const CloudAuthenticationList = cloudAuthenticationList(context);

  return function WorkspaceDetailPage({
    org_id,
    project_id,
    workspace_id,
  }: any) {
    getByIdQuery.run({ org_id, project_id, workspace_id });
    stores.run.getAllByWorkspaceQuery.run({ org_id, project_id, workspace_id });
    stores.cloudAuthentication.getAllByWorkspaceQuery.run({
      org_id,
      project_id,
      workspace_id,
    });

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

    return Page(
      Form(
        header(
          h1("Workspace Details"),
          ButtonAddWorkspace(
            {
              href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}/runs/create`,
            },
            "+ New Run"
          )
        ),
        () =>
          !getByIdQuery.loading.val &&
          WorkspaceDetailContent(getByIdQuery.data.val),
        h2("Cloud Authentication"),
        DropdownMenu({
          items,
          ListItem,
          label: "+ Add",
        }),
        // ButtonGroup(
        //   ButtonAdd(
        //     {
        //       href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}/cloud_authentication/create/aws`,
        //     },
        //     "+ AWS "
        //   ),
        //   ButtonAdd(
        //     {
        //       href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}/cloud_authentication/create/azure`,
        //     },
        //     "+ Azure "
        //   ),
        //   ButtonAdd(
        //     {
        //       href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}/cloud_authentication/create/google`,
        //     },
        //     "+ Google Cloud "
        //   )
        // ),
        () =>
          !stores.cloudAuthentication.getAllByWorkspaceQuery.loading.val &&
          CloudAuthenticationList(
            stores.cloudAuthentication.getAllByWorkspaceQuery.data.val
          ),
        h2("Runs"),
        RunList(stores.run.getAllByWorkspaceQuery),
        h2("Danger Zone"),
        ButtonDelete(
          {
            href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}/destroy`,
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
