import { Context } from "@grucloud/bau-ui/context";
import loadingButton from "@grucloud/bau-ui/loadingButton";

import form from "@grucloud/bau-ui/form";
import buttonBack from "../../components/buttonBack";
import page from "../../components/page";

import configAzureFormContent, {
  azureFormElementToData,
} from "../../components/cloudAuthentication/configAzureFormContent";

export default function (context: Context) {
  const { bau, stores } = context;
  const { h1, header, footer } = bau.tags;
  const ButtonBack = buttonBack(context);
  const LoadingButton = loadingButton(context, {
    color: "primary",
    variant: "solid",
  });
  const Page = page(context);
  const Form = form(context);

  const ConfigAzureFormContent = configAzureFormContent(context);

  return function azureCreatePage({
    org_id,
    project_id,
    workspace_id,
    onSubmitted,
  }: any) {
    const onsubmit = async (event: any) => {
      event.preventDefault();

      await stores.cloudAuthentication.createQuery.run(
        { org_id, project_id, workspace_id },
        {
          provider_type: "azure",
          env_vars: azureFormElementToData(event),
        }
      );
      onSubmitted({ org_id, project_id, workspace_id });
    };

    return Page(
      Form(
        { onsubmit },
        header(h1("Create a new Azure Profile")),
        ConfigAzureFormContent({}),
        footer(
          LoadingButton(
            {
              type: "submit",
              loading: stores.cloudAuthentication.createQuery.loading,
            },
            "Create"
          ),
          ButtonBack()
        )
      )
    );
  };
}
