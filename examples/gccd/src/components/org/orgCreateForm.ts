import { type Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import loadingButton from "@grucloud/bau-ui/loadingButton";

import orgCreateContent from "./orgCreateContent";

export default function (context: Context) {
  const { bau, stores } = context;
  const { footer } = bau.tags;
  const Form = form(context);
  const LoadingButton = loadingButton(context, {
    color: "primary",
    variant: "solid",
  });
  const OrgCreateContent = orgCreateContent(context);

  const onsubmitOrganisation =
    ({ onSubmitted }: any) =>
    async (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(
        new FormData(event.target.closest("form"))
      );
      try {
        await stores.org.createQuery.run(payload);
        onSubmitted(payload);
      } catch (error) {}
    };

  return function OrgCreateForm({ onSubmitted }: any) {
    return Form(
      { onsubmit: onsubmitOrganisation({ onSubmitted }) },
      OrgCreateContent({}),
      footer(
        LoadingButton(
          { type: "submit", loading: stores.org.createQuery.loading },
          "Create Organisation"
        )
      )
    );
  };
}
