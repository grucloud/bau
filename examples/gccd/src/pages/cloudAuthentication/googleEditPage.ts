import { Context } from "@grucloud/bau-ui/context";
import loadingButton from "@grucloud/bau-ui/loadingButton";
import form from "@grucloud/bau-ui/form";
import rubicox from "rubico/x";
const { isEmpty } = rubicox;
import buttonBack from "../../components/buttonBack";
import page from "../../components/page";

import configGoogleFormContent, {
  googleFormElementToData,
} from "../../components/cloudAuthentication/configGoogleFormContent"; //googleFormElementToData,

export default function (context: Context) {
  const { bau, stores, config, window } = context;
  const { h1, p, header, footer } = bau.tags;

  const ButtonBack = buttonBack(context);
  const LoadingButton = loadingButton(context, {
    color: "primary",
    variant: "solid",
  });
  const Page = page(context);
  const Form = form(context);

  const ConfigGoogleFormContent = configGoogleFormContent(context);

  return function awsEditPage({
    org_id,
    project_id,
    workspace_id,
    cloud_authentication_id,
  }: any) {
    stores.cloudAuthentication.getByIdQuery.run({
      org_id,
      project_id,
      workspace_id,
      cloud_authentication_id,
    });

    const contentState = bau.state({});
    bau.derive(() => {
      if (isEmpty(contentState.val)) {
        contentState.val =
          stores.cloudAuthentication.getByIdQuery.data.val?.env_vars?.GOOGLE_CREDENTIALS;
        console.log("GOOGLE_CREDENTIALS", contentState.val);
      }
    });
    const onsubmit = async (event: any) => {
      event.preventDefault();
      await stores.cloudAuthentication.patchQuery.run(
        { org_id, project_id, workspace_id, cloud_authentication_id },
        {
          provider_type: "google",
          env_vars: {
            GOOGLE_CREDENTIALS: contentState.val,
            ...googleFormElementToData(event),
          },
        }
      );

      window.history.pushState(
        "",
        "",
        `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}`
      );
    };
    return Page(
      Form(
        { onsubmit },
        header(h1("Edit the Google Profile")),
        p(),
        () =>
          stores.cloudAuthentication.getByIdQuery.data.val &&
          ConfigGoogleFormContent({
            ...stores.cloudAuthentication.getByIdQuery.data.val?.env_vars,
            onConfig: (content: any) => {
              contentState.val = content;
            },
          }),
        footer(
          LoadingButton(
            {
              type: "submit",
              loading: stores.cloudAuthentication.patchQuery.loading,
            },
            "Save"
          ),
          ButtonBack()
        )
      )
    );
  };
}
