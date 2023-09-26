import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import paper from "@grucloud/bau-ui/paper";
import button from "@grucloud/bau-ui/button";

import loadingButton from "@grucloud/bau-ui/loadingButton";
import input from "@grucloud/bau-ui/input";

export default function (context: Context) {
  const { bau, stores, css, window, config } = context;
  const { h1, header, span, section, footer } = bau.tags;

  const Form = form(context);
  const Paper = paper(context);
  const ButtonCancel = button(context, {
    variant: "outline",
    color: "neutral",
  });

  const LoadingButton = loadingButton(context, {
    variant: "solid",
    color: "danger",
  });

  const className = css`
    max-width: 500px;
    display: inline-flex;
    flex-direction: column;
    gap: 1rem;
    & section {
      display: inline-flex;
    }
  `;

  const Input = input(context);

  return function ProjectDestroyPage({
    org_id,
    project_id,
    workspace_id,
  }: any) {
    const { deleteQuery } = stores.workspace;

    const onsubmit = async (event: any) => {
      event.preventDefault();
      await deleteQuery.run({ org_id, project_id, workspace_id });
      window.history.pushState(
        "",
        "",
        `${config.base}/org/${org_id}/projects/${project_id}`
      );
    };

    return Paper(
      Form(
        { class: className, onsubmit },
        header(h1({ class: "title" }, "Remove Workspace")),
        section(
          span("Remove the workspace from the project"),
          Input({
            autofocus: true,
            placeholder: "Type 'remove'",
            pattern: "remove",
            required: true,
          })
        ),
        footer(
          ButtonCancel({ onclick: () => window.history.back() }, "Cancel"),
          LoadingButton(
            {
              type: "submit",
              loading: deleteQuery.loading,
            },
            "Remove"
          )
        )
      )
    );
  };
}
