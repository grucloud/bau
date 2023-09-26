import { Context } from "@grucloud/bau-ui/context";
import paper from "@grucloud/bau-ui/paper";
import buttonBack from "../../components/buttonBack";
import loadingButton from "@grucloud/bau-ui/loadingButton";
import input from "@grucloud/bau-ui/input";
import formDestroy from "../../components/formDestroy";

export default function (context: Context) {
  const { bau, stores, window, config } = context;
  const { h1, header, span, section, footer } = bau.tags;

  const Paper = paper(context);
  const ButtonBack = buttonBack(context);

  const LoadingButton = loadingButton(context, {
    variant: "solid",
    color: "danger",
  });
  const FormDestroy = formDestroy(context);

  const Input = input(context);

  return function ProjectDestroyPage({ org_id, project_id }: any) {
    const { deleteQuery } = stores.project;

    const onsubmit = async (event: any) => {
      event.preventDefault();
      await deleteQuery.run({ org_id, project_id });
      window.history.pushState("", "", `${config.base}/org/${org_id}`);
    };

    return Paper(
      FormDestroy(
        { onsubmit },
        header(h1("Remove Project")),
        section(
          span("Remove the project from the workspace"),
          Input({
            autofocus: true,
            placeholder: "Type 'remove'",
            pattern: "remove",
            required: true,
          })
        ),
        footer(
          ButtonBack(),
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
