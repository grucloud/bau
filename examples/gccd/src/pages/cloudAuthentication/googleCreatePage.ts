import { Context } from "@grucloud/bau-ui/context";
import loadingButton from "@grucloud/bau-ui/loadingButton";

import form from "@grucloud/bau-ui/form";
import buttonBack from "../../components/buttonBack";
import page from "../../components/page";

import configGoogleFormContent from "../../components/cloudAuthentication/configGoogleFormContent";

export default function (context: Context) {
  const { bau, stores, config, window } = context;
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

  return function googleCreatePage({ org_id, project_id, workspace_id }: any) {
    const onsubmit = async (event: any) => {
      event.preventDefault();
      const { region } = event.target.elements;

      await stores.cloudAuthentication.createQuery.run(
        { org_id, project_id, workspace_id },
        {
          provider_type: "google",
          env_vars: { credentials: contentState.val, region: region.value },
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
        header(h1("Create a new Google Profile")),
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
