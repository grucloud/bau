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
  const ButtonPrevious = buttonPrevious(context);
  const ButtonNext = buttonNext(context);
  const Input = input(context);
  const ButtonsFooter = buttonsFooter(context);

  return function GitCredentialConfig({
    onclickPrevious,
    onclickGitCredential,
  }: any) {
    const onsubmit = (event: any) => {
      const { gitUsername, gitPassword } = event.target.elements;
      event.preventDefault();
      onclickGitCredential({
        username: gitUsername.value,
        password: gitPassword.value,
      });
    };

    return Form(
      {
        onsubmit,
        name: "form-git-credential-config",
      },
      header(
        h1("Git Credentials"),
        p("Provide information about the git credentials")
      ),
      section(
        label(
          "Git Username",
          Input({
            autofocus: true,
            placeholder: "Git Username",
            name: "gitUsername",
            minLength: 3,
            maxLength: 128,
            required: true,
          })
        ),
        label(
          "Git Personal Access Code or password",
          Input({
            placeholder: "Git Personal Access Code",
            type: "password",
            name: "gitPassword",
            minLength: 6,
            required: true,
          })
        )
      ),
      ButtonsFooter(ButtonPrevious({ onclick: onclickPrevious }), ButtonNext())
    );
  };
};
