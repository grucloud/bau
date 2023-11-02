import { Context } from "@grucloud/bau-ui/context";
import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
import loadingButton from "@grucloud/bau-ui/loadingButton";

import button from "@grucloud/bau-ui/button";
import form from "@grucloud/bau-ui/form";
import orgCreateContent, {
  orgFormDataToPayload,
} from "../../components/org/orgCreateContent";
import projectCreateContent, {
  projectFormDataToPayload,
} from "../../components/project/projectCreateContent";
import gitCredentialCreatePage from "../gitCredential/gitCredentialCreatePage";
import workspaceCreateContent, {
  workspaceFormDataToPayload,
} from "../../components/workspace/workspaceCreateContent";
const stepperName = "wizard";

export default (context: Context) => {
  const { bau, stores } = context;
  const { footer } = bau.tags;

  const nextUrl = NextUrl(context, stepperName);
  const Stepper = stepper(context);
  const Form = form(context);
  const LoadingButton = loadingButton(context, {
    color: "primary",
    variant: "solid",
  });
  const ButtonPrevious = button(context, {
    variant: "outline",
    color: "primary",
  });

  const OrgCreateContent = orgCreateContent(context);
  const ProjectCreateContent = projectCreateContent(context);
  const WorkspaceCreateContent = workspaceCreateContent(context);
  const GitCredentialCreatePage = gitCredentialCreatePage(context);

  // Organisation
  const onsubmitOrganisation =
    ({ nextStep }: any) =>
    async (event: any) => {
      event.preventDefault();
      const orgPaylaoad = orgFormDataToPayload(event);
      await stores.org.createQuery.run(orgPaylaoad);
      window.history.pushState(
        "",
        "",
        nextUrl(nextStep.name, { org_id: orgPaylaoad.org_id })
      );
    };

  // GitCredential
  const onsubmitGitCredential =
    ({ nextStep }: any) =>
    () => {
      window.history.pushState("", "", nextUrl(nextStep.name));
    };

  // Project
  const onsubmitProject =
    ({ nextStep }: any) =>
    async (event: any) => {
      event.preventDefault();
      const org_id = new URLSearchParams(window.location.search).get("org_id");
      const payload = projectFormDataToPayload(event);
      await stores.project.createQuery.run({ org_id }, payload);
      window.history.pushState(
        "",
        "",
        nextUrl(nextStep.name, { org_id, project_id: payload.project_id })
      );
    };

  // Workspace
  const onsubmitWorkspace =
    ({ nextStep }: any) =>
    async (event: any) => {
      event.preventDefault();
      const search = new URLSearchParams(window.location.search);
      const org_id = search.get("org_id");
      const project_id = search.get("project_id");
      const payload = workspaceFormDataToPayload(event);
      await stores.workspace.createQuery.run({ org_id, project_id }, payload);

      window.history.pushState("", "", nextUrl(nextStep.name, { org_id }));
    };

  return function WizardPage() {
    const stepperDefs: StepperPage[] = [
      {
        name: "organisation",
        Header: () => "Organisation",
        Content: ({ nextStep }: any) => {
          return Form(
            { onsubmit: onsubmitOrganisation({ nextStep }) },
            OrgCreateContent({}),
            footer(
              LoadingButton(
                { type: "submit", loading: stores.org.createQuery.loading },
                "Create Organisation"
              )
            )
          );
        },
      },
      {
        name: "gitCredential",
        Header: () => "Git Credential",
        Content: ({ nextStep }: any) => {
          const org_id = new URLSearchParams(window.location.search).get(
            "org_id"
          );
          return GitCredentialCreatePage({
            org_id,
            onSubmitted: onsubmitGitCredential({ nextStep }),
          });
        },
      },
      {
        name: "project",
        Header: () => "Project",
        Content: ({ nextStep, previousStep }: any) =>
          Form(
            { onsubmit: onsubmitProject({ nextStep }) },
            ProjectCreateContent({
              org_id: new URLSearchParams(window.location.search).get("org_id"),
            }),
            footer(
              ButtonPrevious({ href: nextUrl(previousStep.name) }, "Previous"),
              LoadingButton(
                { type: "submit", loading: stores.project.createQuery.loading },
                "Create Project"
              )
            )
          ),
      },
      {
        name: "workspace",
        Header: () => "Workspace",
        Content: ({ nextStep, previousStep }: any) =>
          Form(
            { onsubmit: onsubmitWorkspace({ nextStep }) },
            WorkspaceCreateContent({
              org_id: new URLSearchParams(window.location.search).get("org_id"),
              project_id: new URLSearchParams(window.location.search).get(
                "project_id"
              ),
            }),
            footer(
              ButtonPrevious({ href: nextUrl(previousStep.name) }, "Previous"),
              LoadingButton(
                {
                  type: "submit",
                  loading: stores.workspace.createQuery.loading,
                },
                "Create Workspace"
              )
            )
          ),
      },
    ];

    return Stepper({ stepperDefs, stepperName });
  };
};
