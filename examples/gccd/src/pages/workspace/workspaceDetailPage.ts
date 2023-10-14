import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import spinner from "@grucloud/bau-ui/spinner";
import button from "@grucloud/bau-ui/button";
import buttonGroup from "@grucloud/bau-ui/buttonGroup";

import page from "../../components/page";
import workspaceDetailContent from "../../components/workspace/workspaceDetailContent";
import runList from "../../components/run/runList";
import cloudAuthenticationList from "../../components/cloudAuthentication/cloudAuthenticationList";

export default function (context: Context) {
  const { bau, stores, config } = context;
  const { h1, h2, header } = bau.tags;
  const { getByIdQuery } = stores.workspace;

  const Page = page(context);
  const Form = form(context);
  const Spinner = spinner(context, { size: "lg" });
  const ButtonAddWorkspace = button(context, {
    color: "primary",
    variant: "solid",
  });
  const ButtonDelete = button(context, { variant: "outline", color: "danger" });
  const ButtonGroup = buttonGroup(context, {
    color: "primary",
    variant: "outline",
  });

  const ButtonAdd = button(context, {
    color: "primary",
    variant: "outline",
  });

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
        ButtonGroup(
          ButtonAdd(
            {
              href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}/cloud_authentication/create/aws`,
            },
            "+ AWS "
          ),
          ButtonAdd(
            {
              href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}/cloud_authentication/create/azure`,
            },
            "+ Azure "
          ),
          ButtonAdd(
            {
              href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}/cloud_authentication/create/google`,
            },
            "+ Google Cloud "
          )
        ),
        () =>
          !stores.cloudAuthentication.getAllByWorkspaceQuery.loading.val &&
          CloudAuthenticationList(
            stores.cloudAuthentication.getAllByWorkspaceQuery.data.val
          ),
        h2("Runs"),
        () =>
          !stores.run.getAllByWorkspaceQuery.loading.val &&
          RunList(stores.run.getAllByWorkspaceQuery.data.val),
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
