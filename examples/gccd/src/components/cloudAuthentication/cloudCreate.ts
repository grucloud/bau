import { Context } from "@grucloud/bau-ui/context";
import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";

import cloudProviderSelection from "./cloudProviderSelection";
import awsCreatePage from "../../pages/cloudAuthentication/awsCreatePage";
import azureCreatePage from "../../pages/cloudAuthentication/azureCreatePage";
import googleCreatePage from "../../pages/cloudAuthentication/googleCreatePage";
const stepperName = "cloud_wizard";

export default function (context: Context) {
  const { bau, css } = context;
  const { section } = bau.tags;
  const providerPageMap = {
    AWS: awsCreatePage(context),
    Azure: azureCreatePage(context),
    Google: googleCreatePage(context),
  };
  const nextUrl = NextUrl(context, stepperName);
  const Stepper = stepper(context, {
    class: css`
      flex-direction: row;
      gap: 1rem;
      &.stepper {
        & > ul {
          flex-direction: column;
          & > li {
            flex-direction: row;
            gap: 0.5rem;
            justify-content: space-around;
          }
        }
      }
    `,
  });

  const CloudProviderSelection = cloudProviderSelection(context);

  return function CloudCreate({
    org_id,
    project_id,
    workspace_id,
    onSubmitted,
  }: any) {
    const stepperDefs: StepperPage[] = [
      {
        name: "provider_type",
        Header: () => "Cloud Provider",
        Content: ({ nextStep }: any) =>
          CloudProviderSelection({
            nextStep,
            nextUrl,
          }),
      },
      {
        name: "cloud_configuration",
        Header: () => "Configuration",
        Content: ({}: any) => {
          const provider_type = new URLSearchParams(window.location.search).get(
            "provider_type"
          );
          // @ts-ignore
          const Page = providerPageMap[provider_type];
          return Page({
            org_id,
            project_id,
            workspace_id,
            onSubmitted,
          });
        },
      },
    ];

    return section(Stepper({ stepperDefs, stepperName }));
  };
}
