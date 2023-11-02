import { Context } from "@grucloud/bau-ui/context";
import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";

import orgCreateForm from "../../components/org/orgCreateForm";
import projectCreateForm from "../../components/project/projectCreateForm";
import gitCredentialCreatePage from "../gitCredential/gitCredentialCreatePage";
import workspaceCreateForm from "../../components/workspace/workspaceCreateForm";

const stepperName = "wizard";

export default (context: Context) => {
  const { window } = context;

  const pushState = (url: string) => window.history.pushState("", "", url);

  const nextUrl = NextUrl(context, stepperName);
  const Stepper = stepper(context);

  const OrgCreateForm = orgCreateForm(context);
  const ProjectCreateForm = projectCreateForm(context);
  const WorkspaceCreateForm = workspaceCreateForm(context);
  const GitCredentialCreatePage = gitCredentialCreatePage(context);

  return function WizardPage() {
    const stepperDefs: StepperPage[] = [
      {
        name: "organisation",
        Header: () => "Organisation",
        Content: ({ nextStep }: any) =>
          OrgCreateForm({
            onSubmitted: ({ org_id }: any) =>
              pushState(nextUrl(nextStep.name, { org_id })),
          }),
      },
      {
        name: "gitCredential",
        Header: () => "Git Credential",
        Content: ({ nextStep }: any) =>
          GitCredentialCreatePage({
            org_id: new URLSearchParams(window.location.search).get("org_id"),
            onSubmitted: () => pushState(nextUrl(nextStep.name)),
          }),
      },
      {
        name: "project",
        Header: () => "Project",
        Content: ({ nextStep, previousStep }: any) =>
          ProjectCreateForm({
            org_id: new URLSearchParams(window.location.search).get("org_id"),
            previousHref: nextUrl(previousStep.name),
            onSubmitted: ({ org_id, project_id }: any) =>
              pushState(nextUrl(nextStep.name, { org_id, project_id })),
          }),
      },
      {
        name: "workspace",
        Header: () => "Workspace",
        Content: ({ nextStep, previousStep }: any) =>
          WorkspaceCreateForm({
            org_id: new URLSearchParams(window.location.search).get("org_id"),
            project_id: new URLSearchParams(window.location.search).get(
              "project_id"
            ),
            previousHref: nextUrl(previousStep.name),
            onSubmitted: ({ org_id, project_id }: any) =>
              pushState(nextUrl(nextStep.name, { org_id, project_id })),
          }),
      },
    ];

    return Stepper({ stepperDefs, stepperName });
  };
};
