import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import buttonBack from "../../components/buttonBack";
import loadingButton from "@grucloud/bau-ui/loadingButton";

import page from "../../components/page";
import orgCreateContent from "../../components/org/orgCreateContent";

export default function (context: Context) {
  const { bau, stores, config, window } = context;
  const { h1, p, header, footer } = bau.tags;
  const ButtonBack = buttonBack(context);
  const LoadingButton = loadingButton(context, {
    color: "primary",
    variant: "solid",
  });
  const Page = page(context);
  const Form = form(context);

  const OrgCreateContent = orgCreateContent(context);

  const onsubmit = async (event: any) => {
    event.preventDefault();
    const { org_id } = event.target.elements;
    const {} = await stores.org.createQuery.run({
      org_id: org_id.value,
    });

    window.history.pushState("", "", `${config.base}/org/${org_id.value}`);
  };

  return function OrgCreatePage({}) {
    return Page(
      Form(
        { onsubmit },
        header(h1("Create a new organisation")),
        p(
          "A user can create or join an organisation. An organisation contains projects."
        ),
        OrgCreateContent({}),
        footer(
          LoadingButton(
            { type: "submit", loading: stores.org.createQuery.loading },
            "Create"
          ),
          ButtonBack()
        )
      )
    );
  };
}
