import input from "@grucloud/bau-ui/input";
import form from "@grucloud/bau-ui/form";

import { Context } from "@grucloud/bau-ui/context";
import buttonsFooter from "./buttonsFooter";
import buttonPrevious from "./buttonPrevious";
import buttonNext from "./buttonNext";

import selectAwsRegion from "./selectAwsRegion";

export default (context: Context) => {
  const { bau } = context;
  const { section, h1, header, p, label } = bau.tags;

  const Input = input(context);
  const Form = form(context);
  const ButtonPrevious = buttonPrevious(context);
  const ButtonNext = buttonNext(context);

  const ButtonsFooter = buttonsFooter(context);
  const SelectAwsRegion = selectAwsRegion(context);

  return function ConfigAws({ onclickPrevious, onclickCloudConfig }: any) {
    const onsubmit = (event: any) => {
      const { accessKeyId, secretKey, region } = event.target.elements;
      event.preventDefault();
      onclickCloudConfig({
        providerType: "aws",
        providerName: "aws",
        providerAuth: {
          AWSAccessKeyId: accessKeyId.value.trim(),
          AWSSecretKey: secretKey.value,
          AWS_REGION: region.value,
        },
        options: { region: region.value },
      });
    };

    return Form(
      {
        name: "form-config-aws",
        onsubmit,
      },
      header(
        h1("AWS Configuration"),
        p(
          "Please provide the following information to create and scan a new infrastructure"
        )
      ),
      section(
        label(
          "Access Key Id",
          Input({
            placeholder: "Access Key Id",
            name: "accessKeyId",
            autocomplete: "auto",
            pattern: String.raw`\w{16,128}`,
            title: "Length should be greater than 16 and below 128",
            required: true,
          })
        ),
        label(
          "Secret Key",
          Input({
            type: "password",
            placeholder: "Secret Key",
            name: "secretKey",
            pattern: String.raw`\w{16,128}`,
            title: "Length should be greater than 16 and below 128",
            required: true,
          })
        ),
        label(
          "Region",
          SelectAwsRegion({
            name: "region",
          })
        )
      ),
      ButtonsFooter(ButtonPrevious({ onclick: onclickPrevious }), ButtonNext())
    );
  };
};
