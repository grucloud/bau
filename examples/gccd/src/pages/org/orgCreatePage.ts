import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import form from "@grucloud/bau-ui/form";
import buttonBack from "../../components/buttonBack";

import page from "../../components/page";
import orgCreateContent from "../../components/org/orgCreateContent";

export default function (context: Context) {
  const { bau, stores, config, window } = context;
  const { h1, p, header, footer } = bau.tags;
  const ButtonBack = buttonBack(context);
  const ButtonCreate = button(context, { color: "primary", variant: "solid" });
  const Page = page(context);
  const Form = form(context);

  const OrgCreateContent = orgCreateContent(context);

  const onsubmit = async (event: any) => {
    event.preventDefault();
    const { org_name } = event.target.elements;
    const { org_id } = await stores.org.createQuery.run({
      org_name: org_name.value,
    });

    window.history.pushState("", "", `${config.base}/org/${org_id}`);
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
        footer(ButtonCreate({ type: "submit" }, "Create"), ButtonBack())
      )
    );
  };
}
