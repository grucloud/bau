import input from "@grucloud/bau-ui/input";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, label, small, a, h2 } = bau.tags;
  const Input = input(context);

  return function gitPersonalAccessCodeGitHub({}: any) {
    return section(
      h2("GitHub Personal Access Code"),
      label(
        "GitHub Username",
        Input({
          autofocus: true,
          placeholder: "Git Username",
          name: "username",
          minLength: 3,
          maxLength: 128,
          required: true,
        })
      ),
      label(
        "GitHub Personal Access Code or password",
        Input({
          placeholder: "Git Personal Access Code",
          type: "password",
          name: "password",
          minLength: 8,
          required: true,
        }),
        small(
          a(
            {
              href: "https://github.com/settings/tokens/new?scopes=repo",
              target: "_blank",
            },
            "Create a new Personal Access Code with the repo scope"
          )
        )
      )
    );
  };
};
