import button from "@grucloud/bau-ui/button";
import input from "@grucloud/bau-ui/input";
import form from "@grucloud/bau-ui/form";

import { Context } from "@grucloud/bau-ui/context";
import buttonsFooter from "./buttonsFooter";
import buttonPrevious from "./buttonPrevious";

import selectAwsRegion from "./selectAwsRegion";

export default (context: Context) => {
  const { bau } = context;
  const { section, h1, header, p, label, i } = bau.tags;

  const Button = button(context);
  const Input = input(context);
  const Form = form(context);
  const ButtonPrevious = buttonPrevious(context);
  const ButtonsFooter = buttonsFooter(context);
  const SelectAwsRegion = selectAwsRegion(context);

  return function ConfigAws({ onclickPrevious, onclickNext }: any) {
    const onsubmit = (event: any) => {
      // const { infraName, accessKeyId, secretKey, region } =
      //   event.target.elements;
      // alert(
      //   `infraName: ${infraName.value}  accessKeyId ${accessKeyId.value}, region: ${region.value}`
      // );
      event.preventDefault();
      onclickNext();
    };
    return Form(
      {
        name: "form-config-aws",
        onsubmit,
        "data-infra-create": true,
      },
      header(
        h1("AWS Configuration"),
        p(
          "Please provide the following information to create and scan a new infrastructure"
        )
      ),
      section(
        label(
          "Infrastructure Name",
          Input({
            autofocus: true,
            placeholder: "Infrastructure Name",
            name: "infraName",
            pattern: String.raw`\w{3,64}`,
            title: "Length should be greater than 3 and below 64",
            required: true,
          })
        ),
        label(
          "Access Key Id",
          Input({
            placeholder: "Access Key Id",
            name: "accessKeyId",
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
      ButtonsFooter(
        ButtonPrevious({ onclick: onclickPrevious }),
        Button(
          {
            type: "submit",
            variant: "outline",
            color: "primary",
          },
          "Next",
          i("\u25b6")
        )
      )
    );
  };
};
