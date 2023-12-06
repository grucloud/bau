import { Context } from "@grucloud/bau-ui/context";
import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";

import workspaceCreateForm from "../../components/workspace/workspaceCreateForm";
import cloudCreate from "../../components/cloudAuthentication/cloudCreate";

const stepperName = "wizardWorkspace";

export default (context: Context) => {
  const { window, config } = context;

  const pushState = (url: string) => window.history.pushState("", "", url);

  const nextUrl = NextUrl(context, stepperName);
  const Stepper = stepper(context);

  const WorkspaceCreateForm = workspaceCreateForm(context);
  const CloudCreate = cloudCreate(context);

  return function WorkspaceCreatePage(props: any) {
    const { org_id, project_id } = props;
    console.assert(org_id);
    console.assert(project_id);

    const stepperDefs: StepperPage[] = [
      {
        name: "workspace",
        Header: () => "Workspace",
        Content: ({ nextStep }: any) =>
          WorkspaceCreateForm({
            org_id,
            project_id,
            onSubmitted: ({ org_id, project_id, workspace_id }: any) =>
              pushState(
                nextUrl(nextStep.name, { org_id, project_id, workspace_id })
              ),
          }),
      },
      {
        name: "cloud",
        Header: () => "Cloud Provider",
        Content: ({ previousStep }: any) =>
          CloudCreate({
            org_id,
            project_id,
            workspace_id: new URLSearchParams(window.location.search).get(
              "workspace_id"
            ),
            previousHref: nextUrl(previousStep.name),
            onSubmitted: ({ org_id, project_id, workspace_id }: any) =>
              pushState(
                `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}/`
              ),
          }),
      },
    ];

    return Stepper({ stepperDefs, stepperName });
  };
};
