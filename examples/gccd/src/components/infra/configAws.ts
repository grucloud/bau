import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import buttonsFooter from "./buttonsFooter";
import buttonPrevious from "./buttonPrevious";
import buttonNext from "./buttonNext";

import configAwsFormContent, {
  awsFormElementToData,
} from "./configAwsFormContent";

export default (context: Context) => {
  const { bau } = context;
  const { h1, header, p } = bau.tags;

  const Form = form(context);
  const ButtonPrevious = buttonPrevious(context);
  const ButtonNext = buttonNext(context);
  const ButtonsFooter = buttonsFooter(context);
  const ConfigAwsFormContent = configAwsFormContent(context);

  return function ConfigAws({ onclickPrevious, onclickCloudConfig }: any) {
    const onsubmit = (event: any) => {
      event.preventDefault();
      onclickCloudConfig(awsFormElementToData(event));
    };

    return Form(
      {
        name: "form-config-aws-create",
        onsubmit,
      },
      header(
        h1("AWS Configuration"),
        p(
          "Please provide the following information to create and scan a new infrastructure"
        )
      ),
      ConfigAwsFormContent({}),
      ButtonsFooter(ButtonPrevious({ onclick: onclickPrevious }), ButtonNext())
    );
  };
};
