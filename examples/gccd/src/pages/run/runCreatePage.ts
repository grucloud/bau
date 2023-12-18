import { Context } from "@grucloud/bau-ui/context";
import loadingButton from "@grucloud/bau-ui/loadingButton";
import form from "@grucloud/bau-ui/form";
import keyValueList from "@grucloud/bau-ui/keyValueList";

import buttonBack from "../../components/buttonBack";
import page from "../../components/page";
import runCreateContent from "../../components/run/runCreateContent";

export default function (context: Context) {
  const { bau, stores, config, css } = context;
  const { h1, header, footer, li, label, span, a } = bau.tags;
  const ButtonBack = buttonBack(context);
  const LoadingButton = loadingButton(context, {
    color: "primary",
    variant: "solid",
  });
  const Page = page(context);
  const Form = form(context);
  const RunCreateContent = runCreateContent(context);
  const KeyValueList = keyValueList(context, {
    class: css`
      &.keyValueList {
        flex-direction: row;
        gap: 1rem;
      }
    `,
  });

  return function RunCreatePage({ org_id, project_id, workspace_id }: any) {
    console.assert(org_id);
    console.assert(project_id);
    console.assert(workspace_id);

    const onsubmit = async (event: any) => {
      event.preventDefault();
      const { reason, kind } = event.target.elements;
      const { run_id, container_id } = await stores.run.createQuery.run(
        { org_id, project_id, workspace_id },
        {
          reason: reason.value,
          kind: kind.value,
          engine: config.engine,
        }
      );
      console.log("run_id", run_id, "container_id", container_id);
      const search = new URLSearchParams(window.location.search);
      search.set("modal", "run-dialog");
      if (container_id) {
        search.set("container_id", container_id);
      }

      window.history.pushState(
        "",
        "",
        `${
          config.base
        }/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}/runs/${run_id}/logs?${search.toString()}`
      );
    };

    return Page(
      Form(
        { onsubmit },
        header(
          h1("Create a new Run"),
          KeyValueList(
            li(
              label("Organisation"),
              span(a({ href: `${config.base}/org/${org_id}` }, org_id))
            ),
            li(
              label("Project"),
              span(
                a(
                  {
                    href: `${config.base}/org/${org_id}/projects/${project_id}`,
                  },
                  project_id
                )
              )
            ),
            li(
              label("Workspace"),
              span(
                a(
                  {
                    href: `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}`,
                  },
                  workspace_id
                )
              )
            )
          )
        ),

        RunCreateContent({}),
        footer(
          LoadingButton(
            { type: "submit", loading: stores.run.createQuery.loading },
            "Create"
          ),
          ButtonBack()
        )
      )
    );
  };
}
