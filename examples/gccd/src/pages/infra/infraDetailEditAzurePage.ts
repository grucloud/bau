import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import paper from "@grucloud/bau-ui/paper";
import loadingButton from "@grucloud/bau-ui/loadingButton";

import configAzureFormContent, {
  azureFormElementToData,
} from "../../components/infra/configAzureFormContent";
import buttonsFooter from "../../components/infra/buttonsFooter";
import buttonPrevious from "../../components/infra/buttonPrevious";

export default function (context: Context) {
  const { bau, stores, window, config } = context;
  const { h1, header, p } = bau.tags;

  const Paper = paper(context);
  const Form = form(context);
  const ButtonsFooter = buttonsFooter(context);
  const LoadingButtonSave = loadingButton(context, {
    variant: "solid",
    color: "primary",
  });
  const ButtonPrevious = buttonPrevious(context);
  const ConfigAzureFormContent = configAzureFormContent(context);

  return function InfraDetailEditAzurePage({ id }: any) {
    const { getByIdQuery } = stores.infra;
    getByIdQuery.run(id);

    const onsubmit = async (event: any) => {
      event.preventDefault();
      const data = azureFormElementToData(event);
      await stores.infra.patchQuery.run(id, data);
      window.history.pushState("", "", `${config.base}/infra/details/${id}`);
    };

    return Paper(
      Form(
        {
          name: "form-config-edit-azure",
          onsubmit,
        },
        header(
          h1("Azure Configuration"),
          p("Edit and Save the AWS configuration.")
        ),
        () =>
          ConfigAzureFormContent({
            ...getByIdQuery.data.val?.providerAuth,
            region: getByIdQuery.data.val?.options?.region,
          }),
        ButtonsFooter(
          ButtonPrevious({ onclick: () => window.history.back() }),
          LoadingButtonSave(
            { type: "submit", loading: stores.infra.patchQuery.loading },
            "Save"
          )
        )
      )
    );
  };
}
