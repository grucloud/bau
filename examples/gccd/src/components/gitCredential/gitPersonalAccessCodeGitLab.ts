import input from "@grucloud/bau-ui/input";
import { Context } from "@grucloud/bau-ui/context";
import gitPersonalAccessCodeTest from "./gitPersonalAccessCodeTest";
import gitLabStore from "../../stores/gitLabStore";

export default (context: Context) => {
  const { bau, css } = context;
  const { label, small, a, fieldset, legend } = bau.tags;
  const { authenticatedUserQuery } = gitLabStore(context);

  const Input = input(context);
  const GitPersonalAccessCodeTest = gitPersonalAccessCodeTest(context);

  return function gitPersonalAccessCodeGitLab(props: any) {
    const { org_id, project_id, onAuthenticated } = props;
    console.assert(org_id);
    console.assert(project_id);
    console.assert(onAuthenticated);

    const search = new URLSearchParams({
      scopes: "api,read_user",
      name: `Project ${project_id} on organisation ${org_id} by GruCloud`,
    }).toString();

    bau.derive(() => {
      const username = authenticatedUserQuery.data.val.username;
      if (username) {
        onAuthenticated({ username });
      }
    });

    return fieldset(
      {
        class: css`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `,
      },
      legend("GitLab Personal Access Code"),
      label(
        "Gitlab Username",
        Input({
          autofocus: true,
          placeholder: "Git Username",
          name: "username",
          autocomplete: "username",
          minLength: 3,
          maxLength: 128,
          required: true,
          defaultValue: props.username,
        })
      ),
      label(
        "Gitlab Personal Access Code or password",
        Input({
          placeholder: "Git Personal Access Code",
          type: "password",
          name: "password",
          autocomplete: "current-password",
          minLength: 8,
          required: true,
          defaultValue: props.password,
        }),
        small(
          a(
            {
              href: `https://gitlab.com/-/profile/personal_access_tokens?${search}`,
              target: "_blank",
            },
            "Create a new Personal Access Code with the api and read_user scopes."
          )
        )
      ),
      () =>
        GitPersonalAccessCodeTest({ onAuthenticated, authenticatedUserQuery })
    );
  };
};
