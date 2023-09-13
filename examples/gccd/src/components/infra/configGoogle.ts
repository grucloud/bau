import button from "@grucloud/bau-ui/button";
import form from "@grucloud/bau-ui/form";

import { Context } from "@grucloud/bau-ui/context";
import buttonsFooter from "./buttonsFooter";
import buttonPrevious from "./buttonPrevious";

import configGoogleFormContent from "./configGoogleFormContent"; // googleFormElementToData,

export default (context: Context) => {
  const { bau } = context;
  const { h1, header, p, i } = bau.tags;

  const Button = button(context);
  const Form = form(context);
  const ButtonPrevious = buttonPrevious(context);
  const ButtonsFooter = buttonsFooter(context);
  const ConfigGoogleFormContent = configGoogleFormContent(context);

  return function ConfigGoogle({ onclickPrevious, onclickCloudConfig }: any) {
    const contentState = bau.state({});
    const disabledState = bau.state(true);

    const onsubmit = (event: any) => {
      const { region } = event.target.elements;
      event.preventDefault();
      onclickCloudConfig({
        providerType: "google",
        providerName: "google",
        providerAuth: { credentials: contentState.val },
        options: { region: region.value },
      });
    };

    return Form(
      {
        name: "form-config-create-google",
        onsubmit,
      },
      header(
        h1("Google Configuration"),
        p(
          "GruCloud requires a read-only service account to scan a project's architecture. Please select the service account credential JSON file for the project that will be scanned. Follow the following steps to create and upload this file."
        )
      ),
      ConfigGoogleFormContent({
        onConfig: (content: any) => {
          contentState.val = content;
          disabledState.val = false;
        },
      }),
      ButtonsFooter(
        //
        ButtonPrevious({ onclick: onclickPrevious }),
        Button(
          {
            type: "submit",
            variant: "outline",
            color: "primary",
            disabled: disabledState,
          },
          "Next",
          i("\u25b6")
        )
      )
    );
  };
};
