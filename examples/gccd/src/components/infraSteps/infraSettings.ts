import form from "@grucloud/bau-ui/form";
import input from "@grucloud/bau-ui/input";

import { Context } from "@grucloud/bau-ui/context";
import buttonsFooter from "./buttonsFooter";
import buttonPrevious from "./buttonPrevious";
import buttonNext from "./buttonNext";

export default (context: Context) => {
  const { bau } = context;
  const { section, h1, header, p, label } = bau.tags;

  const Form = form(context);
  const Input = input(context);
  const ButtonPrevious = buttonPrevious(context);
  const ButtonNext = buttonNext(context);
  const ButtonsFooter = buttonsFooter(context);

  return function InfraSettings({ onclickPrevious, onclickSettings }: any) {
    const onsubmit = (event: any) => {
      const { infraName, environment } = event.target.elements;
      event.preventDefault();
      onclickSettings({
        name: infraName.value,
        environment: environment.value,
      });
    };

    return Form(
      {
        name: "form-infra-settings",
        onsubmit,
      },
      header(
        h1("Infrastruture Settings"),
        p("Provide information about the infrastructure")
      ),
      section(
        label(
          "Infrastructure Name",
          Input({
            autofocus: true,
            placeholder: "Infrastructure Name",
            name: "infraName",
            minLength: 3,
            maxLength: 128,
            required: true,
          })
        ),
        label(
          "Environment",
          Input({
            placeholder: "Environment",
            name: "environment",
            defaultValue: "dev",
            minLength: 3,
            maxLength: 32,
            required: true,
          })
        )
      ),
      ButtonsFooter(ButtonPrevious({ onclick: onclickPrevious }), ButtonNext())
    );
  };
};
