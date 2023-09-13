//import button from "@grucloud/bau-ui/button";
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

  return function GitRepositoryConfig({
    onclickPrevious,
    onclickGitRepository,
  }: any) {
    const onsubmit = (event: any) => {
      const { repository, branch } = event.target.elements;
      event.preventDefault();
      onclickGitRepository({
        url: repository.value,
        branch: branch.value,
      });
    };

    return Form(
      {
        onsubmit,
        name: "form-git-repository-config",
      },
      header(
        h1("Git Repository"),
        p(
          "Provide information about the git repository. The resources inventory and generated code are stored on your source code git repository."
        )
      ),
      section(
        label(
          "Repository",
          Input({
            autofocus: true,
            placeholder:
              "Git Repository URL: https://github.com/youruser/yourproject",
            name: "repository",
            minLength: 3,
            required: true,
          })
        ),
        label(
          "Branch",
          Input({
            placeholder: "Git Branch",
            name: "branch",
            minLength: 3,
            required: true,
          })
        )
      ),
      ButtonsFooter(ButtonPrevious({ onclick: onclickPrevious }), ButtonNext())
    );
  };
};
