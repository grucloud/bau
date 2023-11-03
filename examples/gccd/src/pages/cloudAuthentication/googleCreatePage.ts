import { Context } from "@grucloud/bau-ui/context";
import loadingButton from "@grucloud/bau-ui/loadingButton";

import form from "@grucloud/bau-ui/form";
import buttonBack from "../../components/buttonBack";
import page from "../../components/page";

import configGoogleFormContent, {
  googleFormElementToData,
} from "../../components/cloudAuthentication/configGoogleFormContent";

export default function (context: Context) {
  const { bau, stores } = context;
  const { h1, header, footer } = bau.tags;

  const contentState = bau.state({});
  const disabledState = bau.state(true);

  const ButtonBack = buttonBack(context);
  const LoadingButton = loadingButton(context, {
    color: "primary",
    variant: "solid",
  });
  const Page = page(context);
  const Form = form(context);

  const ConfigGoogleFormContent = configGoogleFormContent(context);

  return function googleCreatePage({
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
          provider_type: "google",
          env_vars: {
            GOOGLE_CREDENTIALS: contentState.val,
            ...googleFormElementToData(event),
          },
        }
      );
      onSubmitted({ org_id, project_id, workspace_id });
    };

    return Page(
      Form(
        { onsubmit },
        header(h1("Create a new Google Configuration")),
        ConfigGoogleFormContent({
          onConfig: (content: any) => {
            contentState.val = content;
            disabledState.val = false;
          },
        }),
        footer(
          LoadingButton(
            {
              type: "submit",
              loading: stores.cloudAuthentication.createQuery.loading,
              disabled: disabledState,
            },
            "Create"
          ),
          ButtonBack()
        )
      )
    );
  };
}
