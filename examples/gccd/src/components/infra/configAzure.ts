import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import buttonPrevious from "./buttonPrevious";
import buttonsFooter from "./buttonsFooter";
import buttonNext from "./buttonNext";

import configAzureFormContent, {
  azureFormElementToData,
} from "./configAzureFormContent";

export default (context: Context) => {
  const { bau } = context;
  const { h1, header, p } = bau.tags;

  const ButtonPrevious = buttonPrevious(context);
  const ButtonNext = buttonNext(context);
  const ButtonsFooter = buttonsFooter(context);
  const Form = form(context);
  const ConfigAzureFormContent = configAzureFormContent(context);

  return function ConfigAzure({ onclickPrevious, onclickCloudConfig }: any) {
    const onsubmit = (event: any) => {
      event.target.elements;
      event.preventDefault();
      onclickCloudConfig(azureFormElementToData(event));
    };

    return Form(
      {
        name: "form-config-create-azure",
        onsubmit,
      },
      header(
        h1("Azure Configuration"),
        p(
          "Please follow the instructions to setup a service principal used by Grucloud to scan an Azure infrastructure."
        )
      ),
      ConfigAzureFormContent({}),
      ButtonsFooter(ButtonPrevious({ onclick: onclickPrevious }), ButtonNext())
    );
  };
};
