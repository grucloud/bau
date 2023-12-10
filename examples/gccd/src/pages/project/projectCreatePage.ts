import { Context } from "@grucloud/bau-ui/context";
import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";

import projectCreateForm from "../../components/project/projectCreateForm";
import gitConfig from "../../components/git/gitConfig";
import workspaceCreateForm from "../../components/workspace/workspaceCreateForm";
import cloudCreate from "../../components/cloudAuthentication/cloudCreate";

const stepperName = "wizardProject";

export default (context: Context) => {
  const { window, config } = context;

  const pushState = (url: string) => window.history.pushState("", "", url);

  const nextUrl = NextUrl(context, stepperName);
  const Stepper = stepper(context);

  const ProjectCreateForm = projectCreateForm(context);
  const WorkspaceCreateForm = workspaceCreateForm(context);
  const GitConfig = gitConfig(context);
  const CloudCreate = cloudCreate(context);

  return function ProjectCreatePage(props: any) {
    const { org_id } = props;
    console.assert(org_id);
    const stepperDefs: StepperPage[] = [
      {
        name: "project",
        Header: () => "Project",
        Content: ({ nextStep }: any) =>
          ProjectCreateForm({
            org_id,
            onSubmitted: ({ org_id, project_id }: any) =>
              pushState(nextUrl(nextStep.name, { org_id, project_id })),
          }),
      },
      {
        name: "gitCredential",
        Header: () => "Git Config",
        Content: ({ nextStep, previousStep }: any) =>
          GitConfig({
            org_id,
            project_id: new URLSearchParams(window.location.search).get(
              "project_id"
            ),
            previousHref: nextUrl(previousStep.name),
            onSubmitted: () => pushState(nextUrl(nextStep.name)),
          }),
      },
      {
        name: "workspace",
        Header: () => "Workspace",
        Content: ({ nextStep, previousStep }: any) =>
          WorkspaceCreateForm({
            org_id,
            project_id: new URLSearchParams(window.location.search).get(
              "project_id"
            ),
            previousHref: nextUrl(previousStep.name),
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
            project_id: new URLSearchParams(window.location.search).get(
              "project_id"
            ),
            workspace_id: new URLSearchParams(window.location.search).get(
              "workspace_id"
            ),
            previousHref: nextUrl(previousStep.name),
            onSubmitted: ({ org_id, project_id, workspace_id }: any) =>
              pushState(
                `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}`
              ),
          }),
      },
    ];

    return Stepper({ stepperDefs, stepperName });
  };
};
