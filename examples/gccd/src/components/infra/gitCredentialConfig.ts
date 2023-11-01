import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";

import buttonsFooter from "./buttonsFooter";
import buttonPrevious from "./buttonPrevious";
import buttonNext from "./buttonNext";
import gitCredentialFormContent from "../gitCredential/gitPersonalAccessCodeGitHub";

export default (context: Context) => {
  const { bau } = context;
  const { h1, header, p } = bau.tags;

  const Form = form(context);
  const ButtonPrevious = buttonPrevious(context);
  const ButtonNext = buttonNext(context);
  const ButtonsFooter = buttonsFooter(context);
  const GitCredentialFormContent = gitCredentialFormContent(context);

  return function GitCredentialConfig({
    onclickPrevious,
    onclickGitCredential,
  }: any) {
    const onsubmit = (event: any) => {
      const { username, password } = event.target.elements;
      event.preventDefault();
      onclickGitCredential({
        username: username.value,
        password: password.value,
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
      GitCredentialFormContent({}),
      ButtonsFooter(ButtonPrevious({ onclick: onclickPrevious }), ButtonNext())
    );
  };
};
