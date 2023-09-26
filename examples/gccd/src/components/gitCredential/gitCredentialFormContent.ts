import input from "@grucloud/bau-ui/input";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, label, small, a } = bau.tags;
  const Input = input(context);

  return function gitCredentialFormContent({}: any) {
    return section(
      label(
        "Git Username",
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
        "Git Personal Access Code or password",
        Input({
          placeholder: "Git Personal Access Code",
          type: "password",
          name: "password",
          minLength: 8,
          required: true,
        }),
        small(
          a(
            { href: "https://github.com/settings/tokens/new?scopes=repo" },
            "Create a new Personal Access Code"
          )
        )
      )
    );
  };
};
