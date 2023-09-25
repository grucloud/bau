import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import form from "@grucloud/bau-ui/form";

import page from "../../components/page";
import orgCreateContent from "../../components/org/orgCreateContent";

export default function (context: Context) {
  const { bau, stores, config, window } = context;
  const { h1, p, header, footer } = bau.tags;
  const ButtonCancel = button(context, {
    variant: "outline",
    color: "neutral",
  });
  const ButtonCreate = button(context, { color: "primary", variant: "solid" });
  const Page = page(context);
  const Form = form(context);

  const OrgCreateContent = orgCreateContent(context);

  const onsubmit = async (event: any) => {
    event.preventDefault();
    const { organisation } = event.target.elements;

    const { org_id } = await stores.org.createQuery.run({
      name: organisation.value,
    });

    window.history.pushState("", "", `${config.base}/org/${org_id}`);
  };

  return function OrgCreatePage({}) {
    return Page(
      Form(
        { onsubmit },
        header(
          h1("Create a new organisation"),
          p(
            "A user can create or join an organisation. An organisation contains projects."
          )
        ),
        OrgCreateContent({}),
        footer(
          ButtonCreate({ type: "submit" }, "Create"),
          ButtonCancel({ onclick: () => window.history.back() }, "Cancel")
        )
      )
    );
  };
}
