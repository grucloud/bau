import input from "@grucloud/bau-ui/input";
import { Context } from "@grucloud/bau-ui/context";
import gitPersonalAccessCodeTest from "./gitPersonalAccessCodeTest";
import gitHubStore from "../../stores/gitHubStore";

export default (context: Context) => {
  const { bau, css } = context;
  const { label, small, a, fieldset, legend } = bau.tags;
  const { authenticatedUserQuery } = gitHubStore(context);
  const Input = input(context);

  const GitPersonalAccessCodeTest = gitPersonalAccessCodeTest(context);

  return function gitPersonalAccessCodeGitHub(props: any) {
    const { org_id, project_id, onAuthenticated } = props;
    console.assert(org_id);
    console.assert(project_id);
    console.assert(onAuthenticated);

    const search = new URLSearchParams({
      scopes: "repo",
      description: `Project ${project_id} on organisation ${org_id} by GruCloud`,
    }).toString();

    return fieldset(
      {
        class: css`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `,
      },
      legend("GitHub Personal Access Code"),
      label(
        "GitHub Username",
        Input({
          autofocus: true,
          placeholder: "Git Username",
          name: "username",
          autocomplete: "username",
          minLength: 3,
          maxLength: 128,
          siwe: 40,
          required: true,
        })
      ),
      label(
        "GitHub Personal Access Code or password",
        Input({
          placeholder: "Git Personal Access Code",
          type: "password",
          name: "password",
          autocomplete: "current-password",
          minLength: 8,
          required: true,
        }),
        small(
          a(
            {
              href: `https://github.com/settings/tokens/new?${search}`,
              target: "_blank",
            },
            "Create a new Personal Access Code with the repo scope"
          )
        )
      ),
      () =>
        GitPersonalAccessCodeTest({ onAuthenticated, authenticatedUserQuery })
    );
  };
};
