import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import loadingButton from "@grucloud/bau-ui/loadingButton";
import alert from "@grucloud/bau-ui/alert";
import buttonsFooter from "./buttonsFooter";
import buttonPrevious from "./buttonPrevious";

export default (context: Context) => {
  const { bau, stores, window, config } = context;
  const { section, h1, header, p } = bau.tags;

  const Form = form(context);
  const ButtonPrevious = buttonPrevious(context);
  const ButtonsFooter = buttonsFooter(context);
  const LoadingButton = loadingButton(context, {
    variant: "solid",
    color: "primary",
  });

  const Alert = alert(context, { color: "success" });

  return function StepperFinal({
    onclickPrevious,
    cloudconfig,
    gitCredential,
    gitRepository,
    settings,
  }: any) {
    const onsubmit = async (event: any) => {
      event.preventDefault();

      const { id: git_credential_id } =
        await stores.gitCredentials.createQuery.run(gitCredential);

      const {} = await stores.gitRepository.createQuery.run(gitRepository);

      const { id } = await stores.infra.createQuery.run({
        ...cloudconfig,
        ...settings,
        git_credential_id,
        // git_repository_id,
      });

      window.document.dispatchEvent(
        new CustomEvent("alert.add", {
          detail: {
            Component: () => Alert("Project Created"),
          },
        })
      );
      window.history.pushState("", "", `${config.base}/infra/details/${id}`);
    };

    return Form(
      {
        onsubmit,
        name: "form-stepper-final",
      },
      header(h1("Final Review"), p("Ready to create the project")),
      section(),
      ButtonsFooter(
        ButtonPrevious({ onclick: onclickPrevious }),
        LoadingButton(
          { type: "submit", loading: stores.infra.createQuery.loading },
          "Create Project"
        )
      )
    );
  };
};
