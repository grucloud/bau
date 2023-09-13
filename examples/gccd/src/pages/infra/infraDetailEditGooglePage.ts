import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import paper from "@grucloud/bau-ui/paper";
import loadingButton from "@grucloud/bau-ui/loadingButton";

import configGoogleFormContent from "../../components/infra/configGoogleFormContent";
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
  const ConfigGoogleFormContent = configGoogleFormContent(context);

  return function InfraDetailEditGooglePage({ id }: any) {
    const { getByIdQuery } = stores.infra;
    getByIdQuery.run(id);
    let _googleConfig: object;
    const onConfig = async (data: any) => {
      _googleConfig = data;
    };

    const onsubmit = async (event: any) => {
      event.preventDefault();
      await stores.infra.patchQuery.run(id, _googleConfig);
      window.history.pushState("", "", `${config.base}/infra/details/${id}`);
    };

    return Paper(
      Form(
        {
          name: "form-config-edit-google",
          onsubmit,
        },
        header(
          h1("Google Cloud Configuration"),
          p("Edit and Save the Google Cloud configuration.")
        ),
        () => ConfigGoogleFormContent({ onConfig }),
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
